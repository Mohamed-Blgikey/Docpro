import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/APIS/User';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit ,OnDestroy{

  private sub:Subscription|undefined;
  patients:any;
  imgPrefix:string = environment.PhotoUrl;


  DeleteUserForm:FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.email,Validators.required]),
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
})


  constructor(private http:HttpService,private toast:HotToastService,private notify:NotifyService) { }

  ngOnInit(): void {
    this.sub = this.http.Get(User.GetPatients).subscribe(res=>{
      // console.log(res.data);
      this.patients = res.data;
    })

    this.notify.hubConnection.on("EditUser",()=>{
      this.sub = this.http.Get(User.GetPatients).subscribe(res=>{
        // console.log(res.data);
        this.patients = res.data;
      })
    })

    this.notify.hubConnection.on("NewUser",()=>{
      this.sub = this.http.Get(User.GetPatients).subscribe(res=>{
        // console.log(res.data);
        this.patients = res.data;
      })
    })

  }

  AccessDate(user:any){
    // console.log(user);
    let name = user.fullName.split(' ');
    this.DeleteUserForm.controls['id'].setValue(user.id)
    this.DeleteUserForm.controls['email'].setValue(user.email)
    this.DeleteUserForm.controls['firstName'].setValue(name[0])
    this.DeleteUserForm.controls['lastName'].setValue(name[1])
  }
  DeleteUser(){
    // console.log(this.DeleteUserForm.value);
    this.http.Post(`${User.DeleteUser}/${this.DeleteUserForm.controls['id'].value}`)
    .pipe(
      this.toast.observe({
        success: 'Patient deleted !',
        loading: 'Deleting in...',
        error: ( message:any) => `There was an error: ${message} `,
      })
    ).subscribe(res=>{

    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
