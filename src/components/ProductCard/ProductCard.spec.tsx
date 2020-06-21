import * as React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { ProductCard} from './';
import { buildProduct } from '../../__helpers/build-product';

describe('ProductCard', () => {
  it('calls with product identifier when is clicked', () => {
    const product = buildProduct({ handle: 'irrelevant-handle' });
    const clickMock = jest.fn();
    const view = render(<ProductCard product={product} onClick={clickMock} />);

    const button = view.getByRole('button');
    fireEvent.click(button);
    expect(clickMock).toHaveBeenCalledWith(product.handle);
  });
});
