import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/core/APIS/Doctor';
import { reservation } from 'src/app/core/model/Reservation';
import { SearchuserPipe } from 'src/app/core/pipes/searchuser.pipe';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-workschedule',
  templateUrl: './workschedule.component.html',
  styleUrls: ['./workschedule.component.scss']
})
export class WorkscheduleComponent implements OnInit {

  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  sub4:Subscription|undefined;
  sub5:Subscription|undefined;
  sub6:Subscription|undefined;

  ReportFrom = new FormGroup({
    diagnosis:new FormControl('',[Validators.required]),
    treatment:new FormControl('',[Validators.required])
  })
  name :string = '';
  Reservations:reservation[] = [];
  constructor(private http:HttpService,private notify:NotifyService,private toast:HotToastService,public SearchuserPipe:SearchuserPipe) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub1 = this.http.Get(Doctor.GetWorkSchedule).subscribe(res=>{
      this.Reservations = res.data
      // console.log(this.Reservations);
    })

    this.notify.hubConnection.on("BookDoctor",()=>{
      this.sub2 = this.http.Get(Doctor.GetWorkSchedule).subscribe(res=>{
        this.Reservations = res.data
        // console.log(this.Reservations);
      })
    })


    this.notify.hubConnection.on("ReservationDone",()=>{
      this.sub6 = this.http.Get(Doctor.GetWorkSchedule).subscribe(res=>{
        this.Reservations = res.data
        // console.log(this.Reservations);
      })
    })

  }



  patientId:string = '';
  ReservationDone(){
    console.log(this.patientId,this.ReportFrom.value);
    this.sub5 = this.http.Post(`${Doctor.ReservationDone}/${this.patientId}`,this.ReportFrom.value).subscribe(res=>{
        this.toast.success(res.data);
        this.ReportFrom.reset()
      })
  }

}
