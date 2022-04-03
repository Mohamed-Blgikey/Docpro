import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../APIS/User';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,private toast:HotToastService,private auth:AuthService) {}



  getUser(id: string): Observable<any> {
    let token: any = localStorage.getItem('userToken');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.get<any>(`${this.baseUrl}${User.GetUser}/${id}`, {
      headers: header,
    })
  }

  editUser(obj:any): Observable<any> {
    let token: any = localStorage.getItem('userToken');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.put<any>(`${this.baseUrl}${User.EditUser}`,obj, {
      headers: header,
    }).pipe(
      this.toast.observe({
        success: 'Data Updated !',
        loading: 'Updating in...',
        error: ( message:any ) => `There was an error: ${message} `,
      })
    );
  }

  editUserImg(obj:any): Observable<any> {
    let token: any = localStorage.getItem('userToken');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(`${this.baseUrl}${User.SavePhoto}/${this.auth.user['_value'].nameid}`,obj, {
      headers: header,
    }).pipe(
      this.toast.observe({
        success: 'Image Updated !',
        loading: 'Updating in...',
        error: ( message:any) => `There was an error: ${message} `,
      })
    );
  }

  UnSavePhoto(obj:any){
    let token: any = localStorage.getItem('userToken');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(`${this.baseUrl}${User.UnSavePhoto}`,obj, {
      headers: header,
    })
  }

}
