import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  PayOrder(obj:any):Observable<Order[]>{
    return this.http.post<Order[]>("https://sia-store.runasp.net/api/Payment/Pay",obj);
  }
}
