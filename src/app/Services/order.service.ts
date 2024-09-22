import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  SetOrder(userid:string):Observable<Order>{
    return this.http.post<Order>(`https://sia-store.runasp.net/api/Order/SetOrder?userid=${userid}`,{});
  }
  getUserOrders(userid:string):Observable<Order[]>{
    return this.http.get<Order[]>(`https://sia-store.runasp.net/api/Order/GetUserOrders?userid=${userid}`);
  }
  CancelOrder(userid:string,orderid:number):Observable<Order[]>{
    return this.http.delete<Order[]>(`https://sia-store.runasp.net/api/Order/CancelOrder?userid=${userid}&orderId=${orderid}`)
  }
}
