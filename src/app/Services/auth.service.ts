import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserData } from '../Interfaces/user-data';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient ,private router:Router) { }
  private UserData = new BehaviorSubject<UserData | null>(null);
  setUserData(user:UserData | null){
    this.UserData.next(user);
  }
  getuserData(){
    return this.UserData.asObservable();
  }

  RegisterEmail(registerData:any):Observable<any>{
    return this.http.post("https://sia-store.runasp.net/api/User/Register",registerData);
  }
  LoginAccount(loginData:any):Observable<any>{
    return this.http.post("https://sia-store.runasp.net/api/User/Login",loginData);
  }

  logout(){
     localStorage.removeItem("user")
     this.setUserData(null);
     this.router.navigate(["/login"])
    }
    getUserId(){
      let user= localStorage.getItem("user")

      if (user!=null) {

        let userData =JSON.parse(user);
        let tokenData:any = jwtDecode(userData.token);

       return tokenData.UserID;

      }else{
        return null;
      }
    }

}
