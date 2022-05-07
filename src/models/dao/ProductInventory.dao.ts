export interface ProductInventoryDao {
  id: number;
  quantity: number;
  createdAt: Date | undefined;
  modifiedAt: Date | undefined;
}