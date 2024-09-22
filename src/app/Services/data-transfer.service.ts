import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../Interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  constructor() { }
  private ProductType= new BehaviorSubject(0);
  private footerVisible = new BehaviorSubject<boolean>(true);
  footerVisible$ = this.footerVisible.asObservable();
  private Order= new BehaviorSubject<Order|null>(null);

  setProductType(id:number){
    this.ProductType.next(id);
  }
  getProductType(){
    return this.ProductType.asObservable();
  }

  setOrder(order:Order | null){
    this.Order.next(order);
  }
  getOrder(){
    return this.Order.asObservable();
  }
  showFooter() {
    this.footerVisible.next(true);
  }

  hideFooter() {
    this.footerVisible.next(false);
  }
}
