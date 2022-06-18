import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../APIS/Auth';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private _Router: Router,
    private http: HttpClient,
    private toast: HotToastService,
    private router: Router
  ) {
    if (localStorage.getItem('userToken')) {
      this.saveUserData();
      // console.log(this.user.getValue());

    }
  }
  signin(obj: any): Observable<any> {
    return this.http.post(environment.baseUrl + Auth.login, obj).pipe(
      this.toast.observe({
        success: 'Operation Done !',
        loading: 'Logging in...',
        error: (message) => `There was an error: ${message.message} `,
      })
    );
  }

  signUp(obj: any): Observable<any> {
    return this.http.post(environment.baseUrl + Auth.Register, obj).pipe(
      this.toast.observe({
        success: 'Operation Done !',
        loading: 'Signing-UP in...',
        error: (message) => `There was an error: ${message.message} `,
      })
    );
  }
  saveUserData() {
    let token: any = localStorage.getItem('userToken');
    this.user.next(jwtDecode(token));
    // console.log(this.user.getValue());
  }

  validRole() {
    if (this.user['_value'].status == 'Admin') {
      this.router.navigate(['/dashboard/admin']);
    }
    if (this.user['_value'].status == 'Doctor') {
      this.router.navigate(['/dashboard/doctor']);
    }
    if (this.user['_value'].status == 'Patient') {
      this.router.navigate(['/dashboard/patient']);
    }
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userToken');
    this._Router.navigate(['/signin']);
  }
}
