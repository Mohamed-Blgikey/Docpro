import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { user } from "../model/user";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";


@Injectable()

export class UserDetailResolver implements Resolve<user>{

  constructor(private _UserService:UserService,private auth:AuthService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): user | Observable<user> | Promise<user> {
      return this._UserService.getUser((this.auth.user["_value"].nameid)).pipe(
        catchError((error)=>{
          return of();
        })
      )
  }

}
