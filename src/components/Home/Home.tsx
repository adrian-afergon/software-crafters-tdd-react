import * as React from 'react';
import { ProductsRepository } from '../../repositories/ProductsRepository';
import { Product } from '../../models/product';

interface HomeProps {
  productsRepository: ProductsRepository;
}

export const Home: React.FC<HomeProps> = ({ productsRepository }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  React.useEffect(() => {
    productsRepository.getProducts().then(setProducts);
  }, []);
  return (
    <section>
      {products.map(product => <article key={product.handle}>{product.title}</article>)}
    </section>
  );
};
