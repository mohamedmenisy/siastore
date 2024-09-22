import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataTransferService } from '../../Services/data-transfer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule ,ReactiveFormsModule ,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isspin:boolean=false;
errorlist:any[]=[];
errormessage:string="";
constructor(private Auth:AuthService,private data:DataTransferService,private router:Router) {


}
registerForm:FormGroup=new FormGroup({
  name:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  userName:new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
  email:new FormControl('',[Validators.required ,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  confirmPassword:new FormControl(''),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0152][0-9]{8}$/)]),

},{
  validators:[this.confirmPassword]
}as FormControlOptions)

confirmPassword(group:FormGroup){
  let password=group.get("password")
  let repassword=group.get("confirmPassword")
  if (repassword?.value == '') {
    repassword?.setErrors({required:true})
  }else if(password?.value != repassword?.value){
    repassword?.setErrors({mismatch:true})
  }
  }
  register(){
    this.isspin=true;
 this.Auth.RegisterEmail(this.registerForm.value).subscribe({
  next:(response)=>{
    console.log(response);
    this.router.navigate(["/login"])
  },
  error:(response)=>{
    if (response.error.length > 0) {
      this.errorlist=[];
      this.errormessage=""
    for (let i = 0; i < response.error.length; i++) {

      this.errorlist.push(response.error[i].code);

    }
    console.log(this.errorlist);

    }else{
      this.errorlist=[];
      this.errormessage=response.error.message
    }

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
  gologin(event:Event){
    event.preventDefault();
    this.router.navigate(["/login"])
  }
}
