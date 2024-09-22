import { Orderitem } from "./orderitem";

export interface Order {
    id:number,
    orderStatus:string,
    totalOrderPrice:number,
    orderItems:Orderitem[]
    orderDate:Date
    userID:string
}
