describe('Employee spec', () => {
  it('should navigate to first employee when click in first icon edit', () => {
    cy.loadAndVisit();
    //Act
    cy.findAllByRole('button', { name: /edit employee/i })
      .eq(0)
      .click();
    //Assert
    cy.location('hash').should('equal', '#/employees/1');
  });

  it('should delete employee when click in icon delete', () => {
    cy.loadAndVisit();
    
    //Act
    cy.findAllByRole('button', { name: /delete employee/i })
      .eq(0)
      .click();

    cy.get('[data-testid="confirmation-dialog"]').should('exist');

    cy.findAllByRole('button', { name: /delete button/i })
      .eq(0)
      .click();

    //Assert
    cy.get('[data-testid="confirmation-dialog"]').should('not.exist');
    cy.findByRole('table').find('tbody tr').should('have.length', 1);
  });
});
