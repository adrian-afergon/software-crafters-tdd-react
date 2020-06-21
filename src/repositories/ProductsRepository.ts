import { Product } from '../models/product';

export interface ProductsRepository {
  getProducts: () => Promise<Product[]>;
}

export const productsRepository: ProductsRepository = {
  getProducts: () =>
    fetch('http://localhost:4000/products')
      .then(response => response.json())
};
