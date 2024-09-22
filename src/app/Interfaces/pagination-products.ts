import { Product } from "./product";

export interface PaginationProducts {

  pageNumber: number,
  totalPages: number,
  pageSize: number,
  allProducts:number
  products: Product[]
}


