import { CartpageComponent } from './Components/cartpage/cartpage.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ShopComponent } from './Components/shop/shop.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { DetailsComponent } from './Components/details/details.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { authGuard } from './Guards/auth.guard';
import { auth2Guard } from './Guards/auth2.guard';
import { AboutComponent } from './Components/about/about.component';

export const routes: Routes = [
    {path:"",component:HomeComponent,title:"Home",pathMatch:'full'},
    {path:"home",component:HomeComponent,title:"Home"},
    {path:"shop",component:ShopComponent,title:"WELCOME-SHOPE PAGE"},
    {path:"details/:id",component:DetailsComponent,title:"DETAILS PAGE"},
    {path:"about",component:AboutComponent,title:"ABOUT PAGE"},
    {path:"orders",component:OrdersComponent,title:"ORDERS"},
    {path:"checkout",component:CheckoutComponent,title:"CHECKOUT PAGE",canActivate:[auth2Guard]},
    {path:"login",component:LoginComponent,title:"Login",canActivate:[authGuard]},
    {path:"cartpage",component:CartpageComponent,title:"CART PAGE",canActivate:[auth2Guard]},
    {path:"register",component:RegisterComponent,title:"Register",canActivate:[authGuard]},
    {path:"**",component:NotfoundComponent,title:"NotFound"},
];
