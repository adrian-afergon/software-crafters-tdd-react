describe('Product Catalog', () => {

  it('shows the catalog', () => {
    const productTitles = ['Clean Code', 'Clean Architecture', 'Spider-man: Life Story', 'Mastering React']
    cy.visit('/');
    productTitles.map( title => {
      cy.contains(title);
    })
  });
})
