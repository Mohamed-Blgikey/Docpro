import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http:HttpClient) { }

  Get(endPoint:string):Observable<any>{
    let token = localStorage.getItem('userToken')
    let header = {
      headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.get(this.fullPath(endPoint),header);
  }


  Post(endPoint:string, body: any = null):Observable<any>{
    let token: any = localStorage.getItem('userToken');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.post<any>(this.fullPath(endPoint),body, {
      headers: header,
    })
  }

  Delete(endPoint:string,body:any = null):Observable<any>{
    return this.http.delete(this.fullPath(endPoint),body);
  }

  Put (endPoint:string,body:any = null):Observable<any>{
    let token: any = localStorage.getItem('userToken');
    let header = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    return this.http.put<any>(this.fullPath(endPoint),body, {
      headers: header,
    })
  }


  private fullPath(endPoint:string):string{
    return environment.baseUrl + endPoint;
  }





}
