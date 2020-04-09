import { Stack, StackProps, Construct } from '@aws-cdk/core'
import { Repository } from '@aws-cdk/aws-codecommit'
import { App as AmplifyApp, CodeCommitSourceCodeProvider } from '@aws-cdk/aws-amplify'

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

  private createCodeRepository(projectName: string) {
    const repositoryName = `${projectName}-web-spa-repo`.toLowerCase()

    const props = {
      repositoryName,
      description: `The Web SPA source code for ${projectName}.`,
    }

    return new Repository(this, repositoryName, props)
  }

  private createAmplifyApp(projectName: string, repository: Repository) {
    const app = new AmplifyApp(this, projectName, {
      sourceCodeProvider: new CodeCommitSourceCodeProvider({ repository }),
    })
    app.addBranch('master')

    return app
  }
}
