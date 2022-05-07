export interface ProductDao {
  id: number;
  product_price: number;
  product_name: string;
  product_description: string;
  created_at: Date | undefined;
  category_id: number;
  inventory_id: number;
  discount_id: number | undefined;
}