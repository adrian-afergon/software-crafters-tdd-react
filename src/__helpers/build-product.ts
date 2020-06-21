import { Product } from '../models/product';

export const buildProduct = ({
  title = 'irrelevant title',
  price = 0,
  handle = 'irrelevant handle'
}: Partial<Product>): Product => ({
  handle,
  price,
  title
});
