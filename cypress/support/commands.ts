Cypress.Commands.add('loadAndVisit', () => {
  cy.fixture('employees').then((mockData) => {
    cy.visit('/employees', {
      onBeforeLoad(win) {
        (win as any).mockEmployeeList = mockData;
      },
    });
  });
});
