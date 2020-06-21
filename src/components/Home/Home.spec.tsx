import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Home} from './';
import { buildProduct } from '../../__helpers/build-product';
import { Product } from '../../models/product';

describe('Home', () => {
  it('shows a list of products', async () => {
    // Define a data source
    const products: Product[] = [
      buildProduct({handle: 'handle-1', title:'title 1'}),
      buildProduct({handle: 'handle-2', title:'title 2'})
    ];
    const productsRepository = {
      getProducts: jest.fn(() => Promise.resolve(products))
    };
    const view = render(<Home productsRepository={productsRepository}/>);
    // Search in async way all the product titles at the screen
    const foundProducts = await Promise.all(products.map((product) => view.findByText(product.title)));
    expect(foundProducts.length).toBe(products.length);
  });
});
