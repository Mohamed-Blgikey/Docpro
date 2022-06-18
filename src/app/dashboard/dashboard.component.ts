import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { user } from '../core/model/user';
import { AuthService } from '../core/services/auth.service';
import { UserService } from '../core/services/user.service';
import * as signalr from '@aspnet/signalr'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { NotifyService } from '../core/services/notify.service';
import { HttpService } from '../core/services/http.service';
import { Patient } from '../core/APIS/Patient';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  user:user|any;
  error:string = '';
  imgPrefix:string = environment.PhotoUrl;

  EditUserInfo:FormGroup = new FormGroup({
      id: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.email,Validators.required]),
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
  })

  MakeRequestForm:FormGroup = new FormGroup({
    degree:new FormControl('',[Validators.required]),
    descraption:new FormControl('',[Validators.required]),
    patientId:new FormControl('',[Validators.required]),
})


  constructor(private authService:AuthService,private userService:UserService,private route:ActivatedRoute,private notify:NotifyService,private http:HttpService,private toast:HotToastService) {  }


  ngOnInit(): void {
    this.route.data.subscribe(res=>{
      // console.log(res['user'].data);
      this.user = res['user'].data
    })
    this.authService.validRole();
    let name = this.user.fullName.split(' ');
    this.EditUserInfo.controls['id'].setValue(this.user.id)
    this.EditUserInfo.controls['email'].setValue(this.user.email)
    this.EditUserInfo.controls['firstName'].setValue(name[0])
    this.EditUserInfo.controls['lastName'].setValue(name[1])


    this.notify.openConneection()

    this.notify.reConnection();

    this.notify.hubConnection.on("EditUser",()=>{
      this.userService.getUser(this.user.id).subscribe(res=>{
        this.user = res.data;
      });
    })

    this.notify.hubConnection.on("EditUserRole",()=>{
      this.userService.getUser(this.user.id).subscribe(res=>{
        // console.log(res.data);
        if (res.data.status != this.authService.user['_value'].status) {
          this.authService.logOut()
        }
      });
    })
  }

  logOut(){
    this.authService.logOut()
  }

  editUser(){
    // console.log(this.EditUserInfo.value);

    this.userService.editUser(this.EditUserInfo.value) .subscribe(res=>{
      // console.log(res);
      if (res.error == "Email Is Already Token") {
        this.error = res.error
      }
    });

  }

  EditUserImage(e:any){
    if (this.user.photoName != "defualt.png") {
      let photo = {
        userId: this.user.id,
        name:this.user.photoName
      }
      setTimeout(() => {
        this.userService.UnSavePhoto(photo).subscribe(res=>{
          // console.log(res);
        })
      }, 2000);
    }
    var file=e.target.files[0];
    const formData:FormData=new FormData();
    formData.append('photo',file);
    this.userService.editUserImg(formData).subscribe(res=>{
      // console.log(res);
      // this.user = res.data
    })



  }

  clear(){
    this.error = '';
  }



  makeRequest(){
    this.http.Post(Patient.MakeRequest,this.MakeRequestForm.value)
    .pipe(
      this.toast.observe({
        success: 'Request Done !',
        loading: 'Request in...',
        error: ( message:any ) => `There was an error: ${message} `,
      })
    )
    .subscribe(res=>{
      this.userService.getUser(this.user.id).subscribe(res=>{
        this.user = res.data;
      });
    })
  }

  ngOnDestroy(): void {
    this.notify.stopConnection();
  }

}


