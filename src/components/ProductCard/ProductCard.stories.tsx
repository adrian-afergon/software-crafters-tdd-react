import * as React from 'react';
import {ProductCard} from './ProductCard';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'ProductCard',
  decorators: [withA11y],
};

export const withText = () => <ProductCard />;
