describe('Employee List spec', () => {
  it('should fetch employees list greather than 0 when visit /employees', () => {
    cy.loadAndVisit();
    cy.findAllByRole('row').should('have.length.greaterThan', 0);
  });

  it('should show a list of 2 employees', () => {
    cy.loadAndVisit();
    cy.findByRole('table').find('tbody tr').should('have.length', 2);
  });

  it('should display Edit and Delete buttons for each employee', () => {
    cy.loadAndVisit();

    cy.findByRole('table')
      .find('tbody tr')
      .each(($row) => {
        cy.wrap($row).within(() => {
          cy.get('[data-testid="EditIcon"]').should('have.length', 1);
          cy.get('[data-testid="DeleteIcon"]').should('have.length', 1);
        });
      });
  });
});
