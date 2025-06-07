import { mockAuth } from '../support/auth';

describe('Submodule List spec', () => {
  beforeEach(() => {
    mockAuth();
    cy.visit('/submodule-list');
  });

  it('should show two panel project and employee', () => {
    //Arrange
    const projectPanel = 'Proyectos';
    const employeePanel = 'Empleados';

    //Act
    cy.findByRole('link', { name: projectPanel }).as('projectPanel');
    cy.findByRole('link', { name: employeePanel }).as('employeePanel');

    //Assert
    cy.get('@projectPanel').should('be.visible');
    cy.get('@employeePanel').should('be.visible');
  });

  it('should navigate to projects url when click on projects panel', () => {
    // Arrange
    const projectPanel = 'Proyectos';

    // Act
    cy.findByRole('link', { name: projectPanel }).as('projectPanel');
    cy.get('@projectPanel').click();

    // Assert
    // cy.url().should('equal', 'http://localhost:3000/#/projects');
    cy.location('hash').should('equal', '#/projects');
  });

  it('should navigate to employees url when click on employees panel', () => {
    // Arrange
    const employeePanel = 'Empleados';

    // Act
    cy.get('a').contains(employeePanel).click();

    // Assert
    cy.url().should('equal', 'http://localhost:3000/#/employees');
  });
});
