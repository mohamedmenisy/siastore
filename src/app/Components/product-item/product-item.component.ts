import { CartService } from './../../Services/cart.service';
import { Component, Input } from '@angular/core';
import { Product } from '../../Interfaces/product';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { DataTransferService } from '../../Services/data-transfer.service';
import { AuthService } from '../../Services/auth.service';
import { FavoriteService } from '../../Services/favorite.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
@Input() productData?:Product;
userid:string=""
constructor(private cartservice:CartService,
  private data:DataTransferService,
  private auth:AuthService,
  private favservice:FavoriteService,
  private router:Router
) {}
ngOnInit(): void {
  this.userid=this.auth.getUserId();
}
Addtocart(productid:any){
  let userid=this.auth.getUserId();
  if (userid == null) {
    this.router.navigate(["/login"])
  }else{
    this.cartservice.addtocart(productid,this.userid).subscribe({
      next:(response)=>{
        Swal.fire({
          icon: "success",
          title: "Product Added",
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
        Swal.fire({
          icon: "error",
          title: "stock is empity",
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

      }
    });

  }


}

AddToFav(productid:any){
let userid=this.auth.getUserId();

if (userid == null) {
  this.router.navigate(["/login"])}else{

    this.favservice.AddItem(productid,userid).subscribe({
      next:()=>{
        Swal.fire({
          icon: "success",
          title: "Product Added To Favorite",
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
      }
    });
  }

}














}
