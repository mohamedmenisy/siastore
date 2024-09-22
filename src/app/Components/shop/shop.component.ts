import { ProductService } from './../../Services/product.service';
import { Component } from '@angular/core';
import { PaginationProducts } from '../../Interfaces/pagination-products';
import { ProductItemComponent } from '../product-item/product-item.component';
import { Btinterface } from '../../Interfaces/btinterface';
import { LoadingComponent } from '../loading/loading.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTransferService } from '../../Services/data-transfer.service';
import { Loading2Component } from '../loading2/loading2.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductItemComponent,LoadingComponent,NgIf,FormsModule,Loading2Component],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  constructor(private productServices:ProductService,private data:DataTransferService) {

  }
  prodctsData?:PaginationProducts;
  pageNumber:any ;
  pagesize:any;
  allproductCount:any;
  errorMessage:string=""
  totalPages:any;
  brands:any[]=[];
  types:any[]=[];
  // filter prop
  brandidselected=0;
  typeidselected=0;
  // sort options
  sortoption = "alpha"
  //loading
  isloading:boolean=true;
  loading2:boolean=true;
  //searchValue
  searchValue:string=""
  ngOnInit(): void {
    window.scrollTo({
      top:0
    })
    this.setLoad();

    this.getBrands()
    this.getTypes()
    this.data.getProductType().subscribe({
      next:(response)=>{
        this.typeidselected=response;
        this.getProducts();

      }
    });
    this.getProducts();
  }
  getProducts(){
  this.productServices.getProduct(this.brandidselected,this.typeidselected,this.pageNumber,this.sortoption,this.searchValue).subscribe({
    next:response=>{
      this.prodctsData=response;
      this.totalPages=this.prodctsData.totalPages;
      this.pageNumber=this.prodctsData.pageNumber;
      this.pagesize=this.prodctsData.pageSize;
      this.allproductCount=this.prodctsData.allProducts;
      console.log(response);

    },
    error:err=>{


    this.errorMessage=err.error.message
    },
    complete:()=>{
      setTimeout(()=>{
        this.loading2=false;
      },1500)
    },
  })
  }
  getBrands(){
    this.productServices.getBrands().subscribe({
    next:(response)=>{
      this.brands =[{"id":0,name:"All"},...response]
      console.log(response);

    },
    error:(err)=>{
      console.log(err);

    }
    })
  }
  getTypes(){
    this.productServices.getTypes().subscribe({
    next:(response)=>{
      this.types =[{"id":0,name:"All"},...response];
      console.log(response);

    },
    error:(err)=>{
      console.log(err);

    }
    })
  }
  previousPage(){
    this.setLoad();
    this.pageNumber--

    if (this.pageNumber<=1) {

      this.pageNumber=1;
    }
    window.scrollTo(0,0);

    this.getProducts();
  }
  nextPage(){
    this.setLoad();
    this.pageNumber++
    if(this.pageNumber > this.totalPages){
      this.pageNumber=this.totalPages;
    }

    this.getProducts();

    window.scrollTo(0,0);

  }


  ontypeSelected(typeid:number){
    this.typeidselected =typeid;
    this.setLoad();
    this.pageNumber = 1
    this.getProducts();

  }
  onbrandSelected(brandid:number){
    this.brandidselected =brandid;
    this.setLoad();
    this.pageNumber = 1
    this.getProducts();
  }
  onchange(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.sortoption=value;
    this.setLoad();
    this.pageNumber = 1
    this.getProducts();
  }
  setLoad(){
    this.isloading = true;
    setTimeout(() => {
      this.isloading=false;
    }, 1000);
  }

  search(){

    this.getProducts();
    console.log(this.searchValue);

  }
  resetFilters(){
    this.brandidselected=0;
    this.typeidselected=0;
    this.searchValue="";
    this.sortoption="";
    this.pageNumber=1;
    this.getProducts();
  }
}
