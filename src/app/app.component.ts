import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ShopComponent } from './Components/shop/shop.component';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { AuthService } from './Services/auth.service';
import { FooterComponent } from './Components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,ShopComponent,BreadcrumbComponent,BreadcrumbItemDirective,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

  constructor(private auth:AuthService) {


  }
  ngOnInit(): void {
    this.getUserData();

  }
  getUserData(){
    let user= localStorage.getItem("user")

    if (user !=null) {

      let userData =JSON.parse(user);
      this.auth.setUserData(userData);

    }

  }
  title = 'e-commerce';

  }
