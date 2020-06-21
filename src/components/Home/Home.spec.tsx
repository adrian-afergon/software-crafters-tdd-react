import * as React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { Home} from './';
import { buildProduct } from '../../__helpers/build-product';
import { Product } from '../../models/product';
import { ProductsRepository } from '../../repositories/ProductsRepository';
import { HomeText } from './Home';

describe('Home', () => {

  const buildProductRepository = (promise: Promise<Product[]>) => ({
    getProducts: jest.fn(() => promise)
  });

  const buildCartRepository = () => ({
    addItem: jest.fn()
  });

  it('shows a list of products', async () => {
    const products: Product[] = [
      buildProduct({handle: 'handle-1', title:'title 1'}),
      buildProduct({handle: 'handle-2', title:'title 2'})
    ];
    const productsRepository: ProductsRepository = buildProductRepository(Promise.resolve(products));
    const view = render(<Home productsRepository={productsRepository} cartRepository={buildCartRepository()}/>);

    const foundProducts = await Promise.all(products.map((product) => view.findByText(product.title)));
    expect(foundProducts.length).toBe(products.length);
  });

  it('shows a message when list is empty', async () => {
    const products: Product[] = [];
    const productsRepository: ProductsRepository = buildProductRepository(Promise.resolve(products));
    const view = render(<Home productsRepository={productsRepository} cartRepository={buildCartRepository()}/>);

    expect(await view.findByText(HomeText.emptyMessage)).toBeInTheDocument();
  });

  it('shows a error when products can not be retrieved', async () => {
    const error = new Error('irrelevant error');
    const productsRepository: ProductsRepository = buildProductRepository(Promise.reject(error));
    const view = render(<Home productsRepository={productsRepository} cartRepository={buildCartRepository()}/>);

    expect(await view.findByText(error.message)).toBeInTheDocument();
  });

  it('add item to cart', async () => {
    const firstProduct: Product = buildProduct({handle: 'first-product'});
    const secondProduct: Product = buildProduct({handle: 'second-product'});
    const productsRepository = buildProductRepository(Promise.resolve([firstProduct, secondProduct]));
    const cartRepository = {
      addItem: jest.fn(),
    };

    const view = render(<Home productsRepository={productsRepository} cartRepository={cartRepository} />);

    const [, item] = await view.findAllByRole('button');
    fireEvent.click(item);

    expect(cartRepository.addItem).toHaveBeenCalledWith(secondProduct.handle);
  });
});
