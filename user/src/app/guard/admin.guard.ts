import { Injectable } from '@angular/core';
import { Router , CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AdminAuthService } from "../services/admin-auth.service";
@Injectable()
export class AdminGuard implements CanActivate {
  
  constructor(private adminSrevice:AdminAuthService, private router:Router){}
  
  canActivate(){
    if(this.adminSrevice.LoggedIn() == true){
      return true;
    }else{
      this.router.navigateByUrl('/admin-login');
      return false;
    }
  }

  
}
