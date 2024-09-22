import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpClient) { }

  DeleteItem(productid:number,userid:string):Observable<any>{
    return this.http.delete(`https://sia-store.runasp.net/api/Favorite/DeleteItem?_userid=${userid}&_productid=${productid}`,{});
  }
  AddItem(productid:number,userid:string):Observable<any>{
    return this.http.post(`https://sia-store.runasp.net/api/Favorite/AddToFav?_productid=${productid}&_userid=${userid}`,{});
  }
  getFavItems(userid:string):Observable<any>{
    return this.http.get(`https://sia-store.runasp.net/api/Favorite/GetFavorite?userid=${userid}`);
  }
}
