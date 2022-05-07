export interface ProductDto {
  id: number;
  productPrice: number;
  productName: string;
  productDescription: string;
  createdAt: Date |undefined;
  categoryId: number;
  inventoryId: number;
  discountId: number | undefined;
}