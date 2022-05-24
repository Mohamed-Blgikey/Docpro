import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/core/APIS/Doctor';
import { User } from 'src/app/core/APIS/User';
import { AvailableTime } from 'src/app/core/model/AvailableTime';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrls: ['./worktime.component.scss']
})
export class WorktimeComponent implements OnInit,OnDestroy {

  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  sub4:Subscription|undefined;
  sub5:Subscription|undefined;
  sub6:Subscription|undefined;
  sub7:Subscription|undefined;
  AvailableTimes : AvailableTime[] = [];

  addTimeForm:FormGroup = new FormGroup({
    day:new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-z]{3,}$")]),
    from:new FormControl(null,[Validators.required,Validators.pattern("^(1|2|3|4|5|6|8|7|9|10|11|12)(pm|am|PM|AM)$")]),
    to:new FormControl(null,[Validators.required,Validators.pattern("^(1|2|3|4|5|6|8|7|9|10|11|12)(pm|am|PM|AM)$")]),
    doctorId : new FormControl(null,[Validators.required])
  })

  EditAndDeleteForm:FormGroup = new FormGroup({
    id:new FormControl(null,[Validators.required]),
    day:new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-z]{3,}$")]),
    from:new FormControl(null,[Validators.required,Validators.pattern("^(1|2|3|4|5|6|8|7|9|10|11|12)(pm|am|PM|AM)$")]),
    to:new FormControl(null,[Validators.required,Validators.pattern("^(1|2|3|4|5|6|8|7|9|10|11|12)(pm|am|PM|AM)$")]),
    doctorId : new FormControl(null,[Validators.required])
  })

  constructor(private http :HttpService,private auth:AuthService,private toast:HotToastService,private notify:NotifyService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
    this.sub7?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub1 = this.http.Get(`${User.GetAvailableTimes}/${this.auth.user['_value'].nameid}`).subscribe(res=>{
      // console.log(res.data);
      this.AvailableTimes = res.data;
    })

    this.addTimeForm.controls['doctorId'].setValue(this.auth.user['_value'].nameid)
    this.EditAndDeleteForm.controls['doctorId'].setValue(this.auth.user['_value'].nameid)

    this.notify.hubConnection.on("AddAvailableTime",()=>{
      this.sub3 = this.http.Get(`${User.GetAvailableTimes}/${this.auth.user['_value'].nameid}`).subscribe(res=>{
        // console.log(res.data);
        this.AvailableTimes = res.data;
      })
    })

    this.notify.hubConnection.on("EditAvailableTime",()=>{
      this.sub5 = this.http.Get(`${User.GetAvailableTimes}/${this.auth.user['_value'].nameid}`).subscribe(res=>{
        // console.log(res.data);
        this.AvailableTimes = res.data;
      })
    })

    this.notify.hubConnection.on("DeleteAvailableTime",()=>{
      this.sub7 = this.http.Get(`${User.GetAvailableTimes}/${this.auth.user['_value'].nameid}`).subscribe(res=>{
        // console.log(res.data);
        this.AvailableTimes = res.data;
      })
    })
  }

  addTime(){
    // console.log(this.addTimeForm.value);
    this.sub2 = this.http.Post(Doctor.AddAvailableTime,this.addTimeForm.value)
    .pipe(
      this.toast.observe({
        success: 'Add Time done !',
        loading: 'Adding in...',
        error: ( message:any ) => `There was an error: ${message} `,
      })
      )
      .subscribe(res=>{
      // console.log(res);
    })
  }

  accessData(time:AvailableTime){
    this.EditAndDeleteForm.controls['id'].setValue(time.id);
    this.EditAndDeleteForm.controls['day'].setValue(time.day);
    this.EditAndDeleteForm.controls['from'].setValue(time.from);
    this.EditAndDeleteForm.controls['to'].setValue(time.to);
  }

  EditTime(){
    // console.log(this.EditAndDeleteForm.value);
    this.sub4 = this.http.Put(Doctor.EditAvailableTime,this.EditAndDeleteForm.value)
    .pipe(
      this.toast.observe({
        success: 'Edit Time done !',
        loading: 'Editing in...',
        error: ( message:any ) => `There was an error: ${message} `,
      })
      )
      .subscribe(res=>{
      // console.log(res);
    })

  }

  DeleteTime(){
    this.sub6 = this.http.Post(Doctor.DeleteAvailableTime,this.EditAndDeleteForm.value)
    .pipe(
      this.toast.observe({
        success: 'Delete Time done !',
        loading: 'Deleting in...',
        error: ( message:any ) => `There was an error: ${message} `,
      })
      )
      .subscribe(res=>{
      // console.log(res);
    })
  }

}
