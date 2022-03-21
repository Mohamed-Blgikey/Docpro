import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../APIS/Auth';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject(null);
  constructor(private _Router:Router,private http:HttpClient) {
    if (localStorage.getItem('userToken')) {
      this.saveUserData();
    }
  }
  signin(obj:any):Observable<any>{
    return this.http.post(environment.baseUrl+Auth.login,obj)
  }

  signUp(obj:any):Observable<any>{
    return this.http.post(environment.baseUrl+Auth.Register,obj)
  }
  saveUserData(){
    let token:any = localStorage.getItem('userToken');
    this.user.next(jwtDecode(token))
    console.log(this.user.getValue());
  }

  logOut(){
    this.user.next(null);
    localStorage.removeItem("userToken");
    this._Router.navigate(['/login'])
  }
}
