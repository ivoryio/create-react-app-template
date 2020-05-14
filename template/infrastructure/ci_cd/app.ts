import { App } from '@aws-cdk/core'
import { AmplifyStack } from './AmplifyStack'

const projectName = 'PROJECT_NAME'

const app = new App()

new AmplifyStack(app, `${projectName}-stack`, {
  projectName,
  tags: {
    project: projectName,
  },
})
