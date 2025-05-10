describe('Home Screen', () => {
  it('should load the home screen', () => {
    cy.visit('/');
    cy.contains('Tieso Inn');
  })
})
