import * as React from 'react';
import {ProductCard} from './ProductCard';
import { withA11y } from '@storybook/addon-a11y';
import { Product } from '../../models/product';
import { number, text } from '@storybook/addon-knobs';

export default {
  title: 'ProductCard',
  decorators: [withA11y],
};

export const withText = () => {
  const product: Product = {
    handle: text('Handle', 'handle'),
    title: text('Title', 'Some title'),
    price: number('Price', 0),
  };
  return <ProductCard product={product}/>;
};
