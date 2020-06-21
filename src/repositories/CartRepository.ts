export interface CartRepository {
  addItem: (handle: string) => Promise<void>;
}
