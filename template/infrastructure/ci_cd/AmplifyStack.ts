import { BuildSpec } from '@aws-cdk/aws-codebuild'
import { Repository } from '@aws-cdk/aws-codecommit'
import { Stack, StackProps, Construct, SecretValue, CfnOutput } from '@aws-cdk/core'
import { Role, ServicePrincipal, PolicyDocument, PolicyStatement, Effect } from '@aws-cdk/aws-iam'
import {
  App as AmplifyApp,
  CustomRule,
  ISourceCodeProvider,
  GitHubSourceCodeProvider,
  CodeCommitSourceCodeProvider,
} from '@aws-cdk/aws-amplify'

type GitPlatform = 'codecommit' | 'github' | 'other'

export interface AmplifyStackProps extends StackProps {
  projectName: string
  tags: {
    [key: string]: string
  }
}

export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props: AmplifyStackProps) {
    super(scope, id, props)

    const { projectName } = props

    const provider = this.makeSourceCodeProvider(projectName, 'codecommit')
    const app = this.createAmplifyApp(projectName, provider)

    new CfnOutput(this, `${id}-output`, {
      value: app.appId,
      exportName: 'amplify-app-id',
    })
  }

  private makeSourceCodeProvider(projectName: string, gitPlatform: GitPlatform) {
    switch (gitPlatform) {
      case 'codecommit':
        return new CodeCommitSourceCodeProvider({
          repository: this.createCodeRepository(projectName),
        })
      case 'github':
        return new GitHubSourceCodeProvider({
          owner: 'GITHUB_OWNER',
          repository: 'GITHUB_REPO',
          oauthToken: SecretValue.plainText(process.env.GITHUB_SECRET || ''),
        })
      default:
        return
    }
  }

  private createCodeRepository(projectName: string) {
    const repositoryName = `${projectName}-web-spa-repo`.toLowerCase()

    const props = {
      repositoryName,
      description: `The Web SPA source code for ${projectName}.`,
    }

    return new Repository(this, repositoryName, props)
  }

  private createAmplifyApp(projectName: string, sourceCodeProvider?: ISourceCodeProvider) {
    const app = new AmplifyApp(this, `${projectName}-spa`, {
      sourceCodeProvider,
      environmentVariables: {
        USER_DISABLE_TESTS: 'false',
      },
      role: this.createRole(projectName),
      buildSpec: this.createBuildSpec(),
    })
    app.addBranch('master')
    app.addCustomRule(CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT)

    return app
  }

  private createRole(projectName: string) {
    return new Role(this, `${projectName}-amplify-role`, {
      assumedBy: new ServicePrincipal('amplify.amazonaws.com'),
      description: 'Allows Amplify Backend Deployment to access AWS resources on your behalf.',
      inlinePolicies: {
        amplify: new PolicyDocument({
          statements: [
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['cloudformation:*'],
              resources: [
                `arn:aws:cloudformation:${this.region}:371148846105:stackset/*:*`,
                `arn:aws:cloudformation:${this.region}:371148846105:stack/*/*`,
              ],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['iam:*'],
              resources: ['arn:aws:iam::371148846105:role/*'],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['cognito-idp:CreateUserPool'],
              resources: ['*'],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['cognito-idp:*', 'cognito-identity:*'],
              resources: [
                `arn:aws:cognito-identity:${this.region}:371148846105:identitypool/*`,
                `arn:aws:cognito-idp:${this.region}:371148846105:userpool/*`,
              ],
            }),
            new PolicyStatement({
              effect: Effect.ALLOW,
              actions: ['s3:*', 'appsync:*', 'lambda:*', 'dynamodb:*', 'kms:*', 'cloudwatch:*'],
              resources: ['*'],
            }),
          ],
        }),
      },
    })
  }

  private createBuildSpec() {
    return BuildSpec.fromObject({
      version: '0.1',
      content: `
version: 0.1
frontend:
phases:
build:
commands:
  - # this config is needed by amplify, but it is not used by the build system
test:
phases:
test:
commands:
  - # please replace this json object with the yml from 'content' to tell amplify about the tests`,
    })
  }
}
