import { Product } from '../models/product';

export interface ProductsRepository {
  getProducts: () => Promise<Product[]>;
}
