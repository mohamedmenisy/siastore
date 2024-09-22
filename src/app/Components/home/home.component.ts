import { ProductService } from './../../Services/product.service';
import { Component } from '@angular/core';
import { DataTransferService } from '../../Services/data-transfer.service';
import { Router } from '@angular/router';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Product } from '../../Interfaces/product';
import { Loading2Component } from '../loading2/loading2.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductItemComponent,Loading2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isloading:boolean=true;
products:Product[]=[];
private intervalId: any;
constructor(private data:DataTransferService ,private router:Router,private productservice:ProductService) {


}
ngOnInit(): void {
this.getProducts();

 this.intervalId= setInterval(()=>{
    this.getProducts();

  },6000)

}
getProducts(){
  this.productservice.getRandomProducts().subscribe({
    next:(response)=>{
      this.products=response;
    },
    error:(response)=>{

    },
    complete:()=>{
      setTimeout(()=>{
        this.isloading=false;
      },3000)
    }
  });
}
setData(id:number){
  this.data.setProductType(id)
  this.router.navigate(["/shop"])
}
goShop(){
  this.router.navigate(["/shop"])
}
ngOnDestroy(): void {
if (this.intervalId) {
  clearInterval(this.intervalId);
  console.log("Interval cleared");

}

}
}
