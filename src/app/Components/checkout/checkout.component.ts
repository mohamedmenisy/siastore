import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import Swal from 'sweetalert2';
import { Order } from '../../Interfaces/order';
import { DataTransferService } from '../../Services/data-transfer.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  constructor(private router:Router,private payservice:PaymentService,private data: DataTransferService) {}
  errormessage:string=""
  order:Order|null = null;
  ispayed:boolean=false;
  isspin:boolean=false;
  ngOnInit(): void {
    this.data.getOrder().subscribe({
      next:(response)=>{
        this.order=response;
      }
    });

  }

  CheckoutForm:FormGroup=new FormGroup({
    method: new FormControl("",[Validators.required]),
    cartNumber: new FormControl("",[Validators.required,Validators.pattern(/^[0-9]{16}$/)]),
    zipCode: new FormControl("",[Validators.required,Validators.pattern(/^[1-9]{5}$/)]),
    phoneNumber: new FormControl("",[Validators.required,Validators.maxLength(11),Validators.pattern(/^01[0152][0-9]{8}$/)]),
    customerName: new FormControl('',[Validators.required , Validators.minLength(3), Validators.maxLength(20) ]),
    customerEmail:new FormControl('',[Validators.required ,Validators.email]),
  });



  checkout(){
    this.isspin=true;
    if (this.order !=null) {
      let myobj= {
        amount:this.order.totalOrderPrice,
        orderId:this.order.id,
        userID:this.order.userID,
        ...this.CheckoutForm.value
      }
      this.payservice.PayOrder(myobj).subscribe({
        next:(response)=>{
          this.isspin=false;

          this.ispayed=true;
          this.data.setOrder(null);
          Swal.fire({
            icon: "success",
            title: "Order Payed Check You Email",
            background: "black",
            color: "#fff",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
           })

        },
        error:(err)=>{
          console.log(err);
          this.ispayed=false;

        }
      });
      }else{
        setTimeout(() => {
          this.isspin=false;
          this.errormessage="There is no Order To Pay"

        }, 2000);

      }
    }


}
