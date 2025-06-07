describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show an alert with a message when type invalid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = '1234'; // password ok -> test

    //Act
    cy.findByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    // Assert;
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);


    cy.findByRole('button', { name: 'Login' }).click();
    cy.findByText('Usuario y/o password no válidos').should('be.visible');
  });

  it('should navigate to submodule-list url when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.get('input[name="user"]').type(user);
    cy.get('input[name="password"]').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('equal', 'http://localhost:3000/#/submodule-list');
    // cy.location('hash').should('equal', '#/submodule-list');
  });
});
