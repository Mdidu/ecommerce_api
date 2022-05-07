import { ProductDto } from "../models/dto/Product.dto";

export type ProductResponse = {
  codeStatus: number;
  message: string;
  value: ProductDto | Array<ProductDto> | undefined;
}