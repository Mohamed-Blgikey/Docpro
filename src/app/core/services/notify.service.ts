import { Injectable } from '@angular/core';
import * as signalr from '@aspnet/signalr'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class NotifyService {
   hubConnection:any;

  constructor() {

  }
  openConneection(){
    this.hubConnection = new signalr.HubConnectionBuilder()
                                .withUrl(`${environment.baseUrl}/Notify`).build();

    this.hubConnection.start().then(()=>{
      console.log("Connection Start");
    }).catch((err:any)=>console.log(err));
  }

  reConnection(){
    this.hubConnection.onclose(()=>{
      setTimeout(() => {
        console.log("Try To restart");
      this.hubConnection.start().then(()=>{
        console.log("Connection reStart");
      }).catch((err:any)=>console.log(err));
      }, 2000);
    })
  }

  stopConnection(){
    this.hubConnection.stop().then(()=>{
      console.log("Connection Stop !");
    }).catch((err:any)=>console.log(err));
  }



}
