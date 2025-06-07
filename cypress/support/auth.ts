export const mockAuth = () => {
  cy.visit('/');

  cy.window().then((win) => {
    win.localStorage.setItem('userSession', JSON.stringify({
      userName: 'Admin',
      isAuthenticated: true,
    }));
  });
};
