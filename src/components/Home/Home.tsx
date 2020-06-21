import * as React from 'react';
import { ProductsRepository } from '../../repositories/ProductsRepository';
import { Product } from '../../models/product';
import { ProductCard } from '../ProductCard';
import { CartRepository } from '../../repositories/CartRepository';

export enum HomeText {
  emptyMessage = 'No products were found'
}

interface HomeProps {
  productsRepository: ProductsRepository;
  cartRepository: CartRepository;
}

export const Home: React.FC<HomeProps> = ({ productsRepository, cartRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState<Error|null>(null);
  React.useEffect(() => {
    productsRepository.getProducts()
      .then(setProducts)
      .catch(setError);
  }, []);

  const hasProducts = () => products && products.length > 0;

  return (
    <section>
      { error && <p>{error.message}</p> }
      { hasProducts()
        ? products.map(product =>
          <article key={product.handle}>
            <ProductCard
              product={product}
              onClick={cartRepository.addItem}
            />
          </article>)
        : <p>{HomeText.emptyMessage}</p>
      }
    </section>
  );
};
