declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to attach a file to an input type file.
     * @example cy.get('input[type=file]).first().attachFile('fileName.png', image/png')
     */
    attachFile(filename: string, fileType: string): Chainable<Subject>
  }
}
