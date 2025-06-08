declare namespace Cypress {
  interface Chainable {
    loadAndVisit(): Chainable<Element>;
  }
}
