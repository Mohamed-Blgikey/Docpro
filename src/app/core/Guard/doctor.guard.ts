import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
  user:any;
  constructor(
    private authServices:AuthService,
    private router:Router

  ) {  this.user = authServices.user.value  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.user.status != "Doctor") {
        this.router.navigate(["/accessdenied"])
        return false;
      }
    return true;
  }

}
