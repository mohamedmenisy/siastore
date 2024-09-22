import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../Interfaces/order';
import { OrderService } from '../../Services/order.service';
import { Router, RouterLink } from '@angular/router';
import { DataTransferService } from '../../Services/data-transfer.service';

@Component({
  selector: 'app-orderitem',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './orderitem.component.html',
  styleUrl: './orderitem.component.css'
})
export class OrderitemComponent {
@Input()  orderData!: Order;
@Output() orders = new EventEmitter<Order[]>();

constructor(private order:OrderService,private router:Router,private data:DataTransferService) {}

SendOrder(order:Order){
this.data.setOrder(order);
this.router.navigate(["/checkout"])
}



CancelOrder(id:number,userID:string){
this.order.CancelOrder(userID,id).subscribe({
next:(response)=>{
  this.orders.emit(response);

}
});
}

}
