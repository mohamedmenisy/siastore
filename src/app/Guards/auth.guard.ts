import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService)
  let router = inject(Router)
  let user= auth.getUserId();
  if (user != null) {
    router.navigate(["/home"]);
    return false;
  }else{

    return true;
  }
  
};
