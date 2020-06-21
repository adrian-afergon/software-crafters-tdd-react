describe('Product Catalog', () => {

  it('shows the catalog', () => {
    cy.visit('/');
    cy.contains('.products > li');
  });
})
