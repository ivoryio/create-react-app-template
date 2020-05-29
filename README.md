# cra-template-ivory

This is the official @ivoryio create-react-app template 

Run the following command to create a new project based on this template:
`yarn create react-app --template @ivoryio <project-name>`

What this template has to offer:
* infrastructure-as-code for creating a AWS Codecommit repo and an Amplify app (which offers CI/CD and hosting)
* e2e tests with cypress
* components and a customizable theme using material-ui and styled-components
* an intuitive folder structure
* support for aliases
* everything in typescript
* more to follow

# Ivory Project Folder Structure

root                  
   ├ amplify - amplify resources

   ├ cypress - E2E tests folder

   ├ infrastructure - codecommit resources
   
   ├ public - contains root index.html file. Normally we recommend importing [stylesheets](https://create-react-app.dev/docs/adding-a-stylesheet), [images, and fonts](https://create-react-app.dev/docs/adding-images-fonts-and-files) from JavaScript.
   └─ src  
   
      ├─ app
	      ├─ assets			 - app assets folder
	      ├─ components		 - contains app components and components examples displayed by styleguide which are defined in .md files
	      ├─ screens		 - folder with all app screens
	      ├─ Root.test.tsx.  - Root component correct rendering test
	      ├─ Root.tsx		 - app root entry
	      ├─ Router.tsx      - app router
      ├─ hooks				 - folder with the most used custom hooks such as usePrevious, useBoolean, etc
      ├─ locales  			 - store internationalization json files and generates keys for each word
      ├─ modules          	 - the micro frontends folder
      │  └─ @auth          	 - user authentication module 
      ├─ aws-exports.js   	 - amplify config
      ├─ index.tsx  	  	 - project root entry
      ├─ react-app-env.d.ts  - amplify config
      ├─ serviceWorker.ts    - register, check and unregister of service workers
      └─ setupTests.ts  	 - setup of jest-dom tests
      
# Testing
The E2E tests are made using [cypress](https://www.cypress.io/) and all tests are into **cypress** folder from root directory, which has the following structure:
 - **fixtures** - the folder with fixtures which can be used in any test suite. All fixtures are define using **.json** files which contains relevant mock data which is used in E2E tests. We recommend storage of mock data into fixtures which will represent single source of truth, this way we avoid any typo from tests.
 - **integration** - the folder which contains all E2E test suites. In order to add new tests you need to create new **.spec.ts** file inside this folder. We recommend to store all tests for one entity or for one functionality from the app into single **.spec.ts** file which will contain a suite of tests for it because is easier to manage.
 - **plugins** - the folder which contains plugins that you need to load when the project is opened or re-opened. You can read more [here](https://on.cypress.io/plugins-guide)
 - **support** - the folder which contains support files such as commands. [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax) have important role in wrapping a sequence of actions which are repeating in more tests into one single command, and then to use it everywhere by specifying needed arguments, if needed. You can add a new command using the following syntax `Cypress.Commands.add(name, callbackFn)`, and then inside the callback function you can specify actions for the difined command.

You can run tests by running one of these two commands in project root folder:
 - **yarn cypress:open** which will open the browser where will be displayed all tests suites and you can choose which one you want to run.
 - **yarn cypress:headless** will run all tests in headless mode, without opening the browser. The progress and tests status will be displayed into terminal window.he

We recommend looking over the [best practices](https://docs.cypress.io/guides/references/best-practices.html) for writing E2E tests with Cypress.