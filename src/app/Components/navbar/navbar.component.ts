import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FavoriteService } from '../../Services/favorite.service';
import Swal from 'sweetalert2';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
user:any;
constructor(private auth:AuthService,private fav:FavoriteService,private cartservice:CartService) {}

favitems:any[]=[];

ngOnInit(): void {
this.getuserData();
}




logout(){
  this.auth.logout();
}





getuserData(){
  this.auth.getuserData().subscribe({
    next:(response)=>{
      this.user=response;
    }
  });
}

getFavItems(){
  let userid=this.auth.getUserId();
  this.fav.getFavItems(userid).subscribe({
    next:(response)=>{
      this.favitems=response.favItems;
    }
  });
}
Addtocart(productid:any){
  let userid=this.auth.getUserId();

  this.cartservice.addtocart(productid,userid).subscribe({
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
deletFavitem(productId:number){
  let userid=this.auth.getUserId();

this.fav.DeleteItem(productId,userid).subscribe({
  next:(response)=>{
    this.favitems=response.favItems;

  }
});
}
}
