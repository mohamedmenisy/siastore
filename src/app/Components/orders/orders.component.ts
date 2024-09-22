import { Component } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { CartService } from '../../Services/cart.service';
import { Order } from '../../Interfaces/order';
import { OrderitemComponent } from '../orderitem/orderitem.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderitemComponent,RouterLink ,RouterLinkActive],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

constructor(private order:OrderService,
            private auth:AuthService,
            private cart:CartService,
            private router:Router

            ) {

}
orders:Order[] = [];
ngOnInit(): void {
this.GetAllOrders();
}
GetAllOrders(){
  let userid = this.auth.getUserId();
  this.order.getUserOrders(userid).subscribe({
    next:(response)=>{
      this.orders=response;
    },
    error:(response)=>{}
  });
}
receiveOrders(event:Order[]){
this.orders=event;
}
GoShop(){
this.router.navigate(["/shop"])
}
}
