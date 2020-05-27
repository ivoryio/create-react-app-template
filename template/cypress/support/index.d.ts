/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.dataCy('greeting')
     */
    createInbox(): Chainable<any>
    waitForLatestEmail(indoxId: string): Chainable<any>
    signIn(username: string, password: string): Chainable<any>
    signUp(username: string, password: string): Chainable<any>
    signOut(): Chainable<any>
  }
}
