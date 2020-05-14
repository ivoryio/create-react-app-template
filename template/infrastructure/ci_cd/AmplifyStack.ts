import { join } from 'path'
import { BuildSpec } from '@aws-cdk/aws-codebuild'
import { Repository } from '@aws-cdk/aws-codecommit'
import { Stack, StackProps, Construct } from '@aws-cdk/core'
import { App as AmplifyApp, CodeCommitSourceCodeProvider, CustomRule } from '@aws-cdk/aws-amplify'

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

    const repository = this.createCodeRepository(projectName)
    this.createAmplifyApp(projectName, repository)
  }

  //// If the code is hosted in GitHub, you can use this function instead of creating codecommit repo
  // private makeSourceCodeProvider() {
  //   return new GitHubSourceCodeProvider({
  //     owner: 'owner',
  //     repository: 'repo',
  //     oauthToken: SecretValue.plainText(process.env.GITHUB_SECRET || ''),
  //   })
  // }

  private createCodeRepository(projectName: string) {
    const repositoryName = `${projectName}-web-spa-repo`.toLowerCase()

    const props = {
      repositoryName,
      description: `The Web SPA source code for ${projectName}.`,
    }

    return new Repository(this, repositoryName, props)
  }

  private createAmplifyApp(projectName: string, repository: Repository) {
    const app = new AmplifyApp(this, `${projectName}-spa`, {
      sourceCodeProvider: new CodeCommitSourceCodeProvider({ repository }),
      environmentVariables: {
        USER_DISABLE_TESTS: 'false',
      },
    })
    app.addBranch('master')
    app.addCustomRule(CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT)

    return app
  }
}
