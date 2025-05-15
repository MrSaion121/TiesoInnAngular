describe('Reservation screen flow', () => {
  it('Should allow the user to get to the reservation screen', () => {
    cy.visit('/');

    cy.contains('Reservar ahora').click();

    cy.url().should('include', '/login');

    cy.get('input[formcontrolname="email"]').type('prueba@rodrigo.com');
    cy.get('input[formcontrolname="password"]').type('Hola123');

    cy.get('form').submit();

    cy.url().should('eq', Cypress.config().baseUrl);

    cy.contains('Reservar ahora').click();

    cy.url().should('include', '/rooms');

    cy.get('.room-card').first().find('button.reserve-button').click();

    cy.url().should('include', '/rooms/');
  });
});
