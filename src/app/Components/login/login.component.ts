import { CartService } from './../../Services/cart.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { UserData } from '../../Interfaces/user-data';
import { Router, RouterLink } from '@angular/router';
import { DataTransferService } from '../../Services/data-transfer.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isspin:boolean=false;
errormessage:string=""
constructor(private auth:AuthService,private router:Router ,private data:DataTransferService ,private cart:CartService) {}
loginForm:FormGroup=new FormGroup({
  email:new FormControl('',[Validators.required ,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
})

user:UserData={
  message:"",
  token:""
};
login(){
  this.isspin=true;

this.auth.LoginAccount(this.loginForm.value).subscribe({
  next:(response)=>{
    this.user.message = response.message;
    this.user.token=response.token;
    this.auth.setUserData(this.user);
    localStorage.setItem("user",JSON.stringify(this.user))
    this.router.navigate(["/home"])


  },
  error:(response)=>{

    console.log(response.error.message);
    this.errormessage=response.error.message
    setTimeout(() => {
      this.isspin=false;

    }, 2000);
  }
});

}

ngOnInit() {

  this.data.hideFooter();
}

ngOnDestroy(): void {
  this.data.showFooter();


}
goRegister(event:Event){
  event.preventDefault();
  this.router.navigate(["/register"])
}
}
