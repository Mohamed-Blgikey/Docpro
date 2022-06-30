import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import {User} from 'src/app/core/APIS/User'
import { user } from 'src/app/core/model/user';
import { environment } from 'src/environments/environment';
import { AvailableTime } from 'src/app/core/model/AvailableTime';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Patient } from 'src/app/core/APIS/Patient';
import { HotToastService } from '@ngneat/hot-toast';
import { NotifyService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit,OnDestroy {

  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  sub4:Subscription|undefined;
  sub5:Subscription|undefined;
  doctorId :string = '';
  doctor:user|undefined;
  AvailableTimes:AvailableTime [] = [];

  bookDocForm:FormGroup = new FormGroup({
    time:new FormControl(null,[Validators.required])
  })
  constructor(private active:ActivatedRoute,private http:HttpService,private auth:AuthService,private toast:HotToastService,private notify:NotifyService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
  }

  ngOnInit(): void {
    this.doctorId = this.active.snapshot.params['id']
    // console.log(this.doctorId);
    this.sub1 = this.http.Get(`${User.GetAvailableTimes}/${this.doctorId}`).subscribe(res=>{
      // console.log(res.data);
      this.AvailableTimes = res.data
    })

    this.sub2 = this.http.Get(`${User.GetUser}/${this.doctorId}`).subscribe(res=>{
      // console.log(res.data);
      this.doctor = res.data;
    })

    this.notify.hubConnection.on("AddAvailableTimes",()=>{
      this.sub3 = this.http.Get(`${User.GetAvailableTimes}/${this.doctorId}`).subscribe(res=>{
        // console.log(res.data);
        this.AvailableTimes = res.data
      })
    })

    this.notify.hubConnection.on("EditAvailableTimes",()=>{
      this.sub4 = this.http.Get(`${User.GetAvailableTimes}/${this.doctorId}`).subscribe(res=>{
        // console.log(res.data);
        this.AvailableTimes = res.data
      })
    })

    this.notify.hubConnection.on("DeleteAvailableTimes",()=>{
      this.sub5 = this.http.Get(`${User.GetAvailableTimes}/${this.doctorId}`).subscribe(res=>{
        // console.log(res.data);
        this.AvailableTimes = res.data
      })
    })
  }

  bookDoc(){
    // console.log(this.bookDocForm.value);
    let time = this.AvailableTimes.filter((m:AvailableTime)=>{
      return m.id == this.bookDocForm.controls['time'].value
    })

    // console.log(time[0]);

    let data = {
      doctorId : this.doctorId,
      patientId: this.auth.user['_value'].nameid,
      day : time[0].day,
      from : time[0].from,
      to : time[0].to,
    }

    // console.log(data);
    this.http.Post(Patient.BookDoctor,data).subscribe(res=>{
      // console.log(res);

      if (res.error != null) {
        this.toast.error(res.error)
      }else{
        this.toast.success("Booked Done !")
      }
    })


  }

}
