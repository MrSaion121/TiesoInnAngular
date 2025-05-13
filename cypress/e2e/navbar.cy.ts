describe('Home Screen', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to the login page when the login button is clicked', () => {
    cy.get('#login-register').click();
    cy.get('#login').click();
    cy.url().should('include', '/login');
  });
});
