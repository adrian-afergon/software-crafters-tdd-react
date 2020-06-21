import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Home} from './';
import { buildProduct } from '../../__helpers/build-product';
import { Product } from '../../models/product';
import { ProductsRepository } from '../../repositories/ProductsRepository';
import { HomeText } from './Home';

describe('Home', () => {

  const buildProductRepository = (promise: Promise<Product[]>) => ({
    getProducts: jest.fn(() => promise)
  });

  it('shows a list of products', async () => {
    const products: Product[] = [
      buildProduct({handle: 'handle-1', title:'title 1'}),
      buildProduct({handle: 'handle-2', title:'title 2'})
    ];
    const productsRepository: ProductsRepository = buildProductRepository(Promise.resolve(products));
    const view = render(<Home productsRepository={productsRepository}/>);

    const foundProducts = await Promise.all(products.map((product) => view.findByText(product.title)));
    expect(foundProducts.length).toBe(products.length);
  });

  it('shows a message when list is empty', async () => {
    const products: Product[] = [];
    const productsRepository: ProductsRepository = buildProductRepository(Promise.resolve(products));
    const view = render(<Home productsRepository={productsRepository}/>);

    expect(await view.findByText(HomeText.emptyMessage)).toBeInTheDocument();
  });

  it('shows a error when products can not be retrieved', async () => {
    const error = new Error('irrelevant error');
    const productsRepository: ProductsRepository = buildProductRepository(Promise.reject(error));
    const view = render(<Home productsRepository={productsRepository}/>);

    expect(await view.findByText(error.message)).toBeInTheDocument();
  });

});
