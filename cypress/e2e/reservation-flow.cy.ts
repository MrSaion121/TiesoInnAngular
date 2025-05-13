// Tests for reservation flow and authentication redirect
describe('Reservation Flow', () => {
  // Reset state before each test
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  // Test redirection to login page for unauthenticated users
  it('should redirect to login page when clicking "Reservar ahora" without being logged in', () => {
    cy.contains('Reservar ahora').click();
    cy.url().should('include', '/login');
    cy.contains('Iniciar sesión').should('be.visible');
  });

  // Test full authentication flow
  it('should store intended URL when redirected to login', () => {
    cy.contains('Reservar ahora').click();
    cy.url().should('include', '/login');
    
    // Enter login credentials
    cy.get('input[formControlName="email"]').type('axel@axel.com');
    cy.get('input[formControlName="password"]').type('axelaxel');
    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.contains('Ingresar').click();
    
    // Verify successful login
    cy.url().should('include', '/');
    cy.get('app-navbar').contains('axel').should('be.visible');
  });
});