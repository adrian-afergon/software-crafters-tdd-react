import * as React from 'react';
import {Home} from './Home';
import { withA11y } from '@storybook/addon-a11y';

export default {
  title: 'Home',
  decorators: [withA11y],
};

export const withText = () => <Home />;
