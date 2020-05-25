import { BuildSpec } from '@aws-cdk/aws-codebuild'
import { Repository } from '@aws-cdk/aws-codecommit'
import { Stack, StackProps, Construct, SecretValue, CfnOutput } from '@aws-cdk/core'
import {
  App as AmplifyApp,
  CustomRule,
  ISourceCodeProvider,
  GitHubSourceCodeProvider,
  CodeCommitSourceCodeProvider,
} from '@aws-cdk/aws-amplify'

type GitPlatform = 'codecommit' | 'github' | 'other'

export interface IAmplifyStackProps extends StackProps {
  projectName: string
  tags: {
    [key: string]: string
  }
}

export class AmplifyStack extends Stack {
  constructor(scope: Construct, id: string, props: IAmplifyStackProps) {
    super(scope, id, props)

    const { projectName } = props

    const provider = this.makeSourceCodeProvider(projectName, 'GIT_PROVIDER')
    const app = this.createAmplifyApp(projectName, provider)

    new CfnOutput(this, `${id}-output`, {
      value: app.appId,
      exportName: 'amplify-app-id',
    })
  }

  private makeSourceCodeProvider(projectName: string, gitPlatform: GitPlatform) {
    switch (gitPlatform) {
      case 'codecommit':
        const repository = this.createCodeRepository(projectName)
        return new CodeCommitSourceCodeProvider({ repository })
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
      buildSpec: BuildSpec.fromObject({
        version: '1.0',
        frontend: {
          phases: {
            build: {
              commands: ['# this config is needed by amplify, but it is not used'],
            },
          },
        },
        test: {},
      }),
    })
    app.addBranch('master')
    app.addCustomRule(CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT)

    return app
  }
}
