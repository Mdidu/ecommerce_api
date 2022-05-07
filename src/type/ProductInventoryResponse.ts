import { ProductInventoryDto } from '../models/dto/ProductInventory.dto';

export type ProductInventoryResponse = {
  codeStatus: number;
  message: string;
  value?: ProductInventoryDto | Array<ProductInventoryDto> | number | undefined;
}