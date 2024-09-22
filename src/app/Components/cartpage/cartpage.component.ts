import { ProductService } from './../../Services/product.service';
import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Usercart } from '../../Interfaces/usercart';
import { DataTransferService } from '../../Services/data-transfer.service';
import { Cartitem } from '../../Interfaces/cartitem';
import Swal from 'sweetalert2';
import { OrderService } from '../../Services/order.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-cartpage',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.css'
})
export class CartpageComponent {


  constructor(private cartService:CartService,
              private data:DataTransferService,
              private order:OrderService,
              private router:Router,
              private auth:AuthService,
              ) {}
  userid:string=""
  usercart:Usercart | undefined;
  length:number=0;
  ngOnInit(): void {
    this.userid= this.auth.getUserId();
    this.getCartUser();
  }
  getCartUser(){
    this.cartService.getCart(this.userid).subscribe({
      next:(response)=>{
        this.usercart=response;
        this.length = response.cartItems.length
      }
    });

  }
  TotalPrice(quantity:number , price:number){
    return quantity * price;
  }

  deleteProduct(prodId:number){
    this.cartService.DeletFromCart(prodId,this.userid).subscribe({
      next:(response)=>{
        this.usercart=response;
      }
    });
  }
  PlusQ(product:Cartitem){
    product.quantity++
    let UpdateQ= {

        userId:this.userid,
        productId: product.productId,
        quantity: product.quantity

    }
    this.update(UpdateQ);
  }
  MinusQ(product:Cartitem){
    product.quantity--
    if (product.quantity == 0) {
        this.deleteProduct(product.productId);
    }
    let UpdateQ= {

      userId: this.userid,
      productId: product.productId,
      quantity: product.quantity


    }
    this.update(UpdateQ);

  }
update(obj:any){
  this.cartService.updateQuantity(obj).subscribe({
    next:(response)=>{
      this.usercart?this.usercart.totalPrice=response.totalPrice:response.totalPrice;

    }
  });

}
CreateOrder(){

  this.order.SetOrder(this.userid).subscribe({
    next:(response)=>{

      Swal.fire({
        icon: "success",
        title: "ORDER Success",
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
       this.usercart = undefined
       this.router.navigate(["/orders"]);

    },
    error:(response)=>{
      this.router.navigate(["/shop"]);
    }
  });
}
updatecart(){
  this.getCartUser();
}
}
