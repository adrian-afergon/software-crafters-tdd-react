import * as React from 'react';
import { Product } from '../../models/product';

interface ProductCardProps {
  product: Product;
  onClick?: (handle: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick}) => (
  <div>
    <h3>{product.title}</h3>
    <p>
      Price:
      <span>{product.price}</span>
    </p>
    {
      onClick &&
      <button type="button" onClick={() => { onClick(product.handle); }}>Add to cart</button>
    }
  </div>
);
