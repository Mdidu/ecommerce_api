export interface DiscountDao {
  id: number;
  discountName: string;
  discountDescription: string;
  discountPercent: number;
  active: boolean;
  createdAt: Date;
  modifiedAt: Date;
}