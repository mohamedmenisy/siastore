import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../Interfaces/product';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../../Services/cart.service';
import { DataTransferService } from '../../Services/data-transfer.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ProductItemComponent,CurrencyPipe,ProductItemComponent,RouterLink,RouterLinkActive],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  product?:Product;
  products:any;
  productid:any;
  userid:string=""
  constructor(private productService:ProductService,
    private activatedRouter:ActivatedRoute,
    private cartservice :CartService,
    private data:DataTransferService,
    private router:Router,
    private auth:AuthService,
    ) {}
    ngOnInit(): void {
      this.activatedRouter.paramMap.subscribe({
        next:(prams)=>{
          this.productid=prams.get("id");
          this.loadProduct(this.productid);
        }
      })
    this.userid=this.auth.getUserId();
    }


    loadProduct(id:number){
      window.scrollTo({top:0})

        this.productService.getProductById(id).subscribe({
        next:(response)=>{
          this.product=response;
          this.getProductsByType(response.productType);

        },
        error:(err)=>{
        }
      })
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
          }

        });
      }


    }
    getProductsByType(typename:string){
      this.productService.getProductByTypeName(typename).subscribe({
        next:(response)=>{

          this.products=response.slice(0,6);
        }
      });
    }

    ViewMore(type:string|undefined){
      if (type?.toLowerCase() == "Short") {
        this.data.setProductType(1);
      }
      if (type?.toLowerCase() == "tshirt") {
        this.data.setProductType(2);
      }
      if (type?.toLowerCase() == "skirt") {
        this.data.setProductType(3);
      }
      if (type?.toLowerCase() == "shoes") {
        this.data.setProductType(4);
      }
      if (type?.toLowerCase() == undefined) {
        this.data.setProductType(0);
      }
      this.router.navigate(["/shop"]);
    }
}
