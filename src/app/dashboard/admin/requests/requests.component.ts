import { Component, OnDestroy, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/core/APIS/Admin';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit ,OnDestroy{

  private sub1:Subscription|undefined;
  private sub2:Subscription|undefined;
  private sub3:Subscription|undefined;

  requests:[] = [];

  constructor(private http:HttpService,private notify:NotifyService,private toast:HotToastService) { }


  ngOnInit(): void {
    this.sub1 = this.http.Get(Admin.GetRequests).subscribe(res=>{
      // console.log(res.data);
      this.requests = res.data
    })

    this.notify.hubConnection.on("makeRequest",()=>{
      // console.log("asdassad");
      this.sub2 = this.http.Get(Admin.GetRequests).subscribe(res=>{
        this.requests = res.data
        // console.log(res);
      })
    })

    this.notify.hubConnection.on("DeleteRequests",()=>{
      // console.log("asdassad");
      this.sub3 = this.http.Get(Admin.GetRequests).subscribe(res=>{
        this.requests = res.data
      })
    })


  }

  RequestAction(request:any,status:number){
    // console.log(0);
    let obj = {
      id :request.id,
      status:status
    }
    this.http.Post(Admin.DeleteRequest,obj)
    .pipe(
      this.toast.observe({
        success: 'Operation Done !',
        loading: 'Loading in...',
        error: ( message:any) => `There was an error: ${message} `,
      })
    )
    .subscribe(res=>{
      // console.log(res);
    })

  }


  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }

}
