import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usercart } from '../Interfaces/usercart';
import { Observable } from 'rxjs';
import { Cartitem } from '../Interfaces/cartitem';
import { jwtDecode } from 'jwt-decode';
import { Usercartv2 } from '../Interfaces/usercartv2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient ,private auth:AuthService) {
  }


  getCart(userid:string):Observable<Usercart>{

    return this.http.get<Usercart>(`https://sia-store.runasp.net/api/Cart/GetUserCart?UserId=${userid}`);
  }

  addtocart(productid:number,userid:string):Observable<Usercart>{

    return this.http.post<Usercart>(`https://sia-store.runasp.net/api/Cart/AddToCart?_productid=${productid}&_userid=${userid}`,{});
  }
  DeletFromCart(productid:number,userid:string):Observable<Usercart>{
    return this.http.delete<Usercart>(`https://sia-store.runasp.net/api/Cart/DeleteFromCart?userid=${userid}&productid=${productid}`);
  }


  updateQuantity(updatQ:any):Observable<Usercart>{

    return this.http.put<Usercart>("https://sia-store.runasp.net/api/Cart/UpdateQuantity",updatQ);
  }
}
