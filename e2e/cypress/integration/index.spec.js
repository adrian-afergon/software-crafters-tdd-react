import { products } from '../fixtures/catalog/products.json'

describe('Product Catalogue', () => {

  const productsEndpoint = {
    method: 'GET',
    url: 'http://localhost:4000/products',
  };

  beforeEach(() => {
    cy.server();
  });

  it('shows the catalog', () => {
    cy.route({...productsEndpoint, response: 'fixture:catalog/products', status: 200 });

    cy.visit('/');
    products.map( ({title}) => {
      cy.contains(title);
    })
  });
})
