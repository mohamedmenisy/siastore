import { Cartitem } from "./cartitem";

export interface Usercart {
   userId:number,
   totalPrice:number ,
   totalQuantity:number ,
   cartItems:Cartitem []
}
