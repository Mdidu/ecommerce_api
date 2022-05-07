import { ProductCategoryDto } from './../models/dto/ProductCategory.dto';

export type ProductCategoryResponse = {
  codeStatus: number;
  message: string;
  value?: ProductCategoryDto | Array<ProductCategoryDto> | undefined;
}