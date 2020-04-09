import { App } from '@aws-cdk/core'
import { AmplifyStack } from './AmplifyStack'

const PROJECT_NAME = process.env.PROJECT_NAME || 'PROJECT_NAME'

const app = new App()

new AmplifyStack(app, `${PROJECT_NAME}`, {
  projectName: `${PROJECT_NAME}`,
  tags: {
    project: PROJECT_NAME,
  },
})
