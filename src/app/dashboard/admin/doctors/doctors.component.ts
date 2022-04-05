import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/APIS/User';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit ,OnDestroy{

  private sub:Subscription|undefined;
  private sub1:Subscription|undefined;
  private sub2:Subscription|undefined;
  private sub3:Subscription|undefined;
  doctors:any
  imgPrefix : string = environment.PhotoUrl;

  DeleteUserF:FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.email,Validators.required]),
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
})

  constructor(private http:HttpService,private toast:HotToastService,private notify:NotifyService) { }


  ngOnInit(): void {
    this.sub = this.http.Get(User.GetDoctors).subscribe(res=>{
      // console.log(res.data);
      this.doctors = res.data

    })

    this.notify.hubConnection.on("NewUser",()=>{
      this.sub2 = this.http.Get(User.GetPatients).subscribe(res=>{
        // console.log(res.data);
        this.doctors = res.data;
      })
    })

    this.notify.hubConnection.on("EditUser",()=>{
      this.sub3 = this.http.Get(User.GetUsers).subscribe(res=>{
        // console.log(res.data);
        this.doctors = res.data;
      })
    })
  }



  AccessDate(user:any){
    // console.log(user);
    let name = user.fullName.split(' ');
    this.DeleteUserF.controls['id'].setValue(user.id)
    this.DeleteUserF.controls['email'].setValue(user.email)
    this.DeleteUserF.controls['firstName'].setValue(name[0])
    this.DeleteUserF.controls['lastName'].setValue(name[1])
  }


  DeleteUser(){
    // console.log(this.DeleteUserF.value);
    this.sub1 = this.http.Post(`${User.DeleteUser}/${this.DeleteUserF.controls['id'].value}`)
    .pipe(
      this.toast.observe({
        success: 'Doctor deleted !',
        loading: 'Deleting in...',
        error: ( message:any) => `There was an error: ${message} `,
      })
    ).subscribe(res=>{

    });
  }



  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
  }

}
