export interface CartRepository {
  addItem: (handle: string) => Promise<void>;
}

export const cartRepository: CartRepository = {
  addItem: (handle) => fetch('http://localhost:4000/cart', {
      method: 'PUT',
      body: JSON.stringify({ handle })
  }).then(response => response.json())
};
