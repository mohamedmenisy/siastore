import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationProducts } from '../Interfaces/pagination-products';
import { Btinterface } from '../Interfaces/btinterface';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {

   }

  getProduct(brandid?:number ,typeid?:number,page?:number,sort?:string,searchValue?:string):Observable<PaginationProducts>{
    let prams = new HttpParams();
    if(brandid) prams=prams.append("brandid",brandid)
    if(typeid) prams=prams.append("typeid",typeid)
    if(page) prams=prams.append("page",page)
    if(sort) prams=prams.append("sortValue",sort)
    if(searchValue) prams=prams.append("searchValue",searchValue)
    return this.http.get<PaginationProducts>("https://sia-store.runasp.net/api/ProductFilter/GetProduct",{params:prams});
  }
  getBrands():Observable<Btinterface[]>{
    return this.http.get<Btinterface[]>("https://sia-store.runasp.net/GetBrands");
  }
  getTypes():Observable<Btinterface[]>{
    return this.http.get<Btinterface[]>("https://sia-store.runasp.net/GetTypes");
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>("https://sia-store.runasp.net/GetProductById/"+id);
  }
  getRandomProducts():Observable<Product[]>{
    return this.http.get<Product[]>("https://sia-store.runasp.net/api/Products/RandomProducts");
  }
  getProductByTypeName(typename:string):Observable<Product[]>{
    return this.http.get<Product[]>(`https://sia-store.runasp.net/api/Products/GetProductByTypename?typename=${typename}`);
  }
}
