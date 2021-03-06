import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/core/APIS/Admin';
import { User } from 'src/app/core/APIS/User';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit ,OnDestroy{


  sub:Subscription|undefined;
  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  sub4:Subscription|undefined;
  sub5:Subscription|undefined;

  users:any
  doctors:any;
  patients:any;
  roles:any ;
  error:string ='';
  EditUserRole:FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.email]),
    roleName: new FormControl('',[Validators.required])
  })


  constructor(private http:HttpService,private notify:NotifyService,private toast:HotToastService) { }

  ngOnInit(): void {
    this.sub = this.http.Get(Admin.GetUsers).subscribe(res=>{
      // console.log(res.data);
      this.users = res.data;
      this.doctors = this.users.filter((u:any)=>{
        return u.status.includes('Doctor')
      })

      this.patients = this.users.filter((u:any)=>{
        return u.status.includes('Patient')
      })

      this.sub1 = this.http.Get(Admin.GetRoles).subscribe(res=>{
        this.roles = res.data;
      })

    })


    this.notify.hubConnection.on("EditUserRole",()=>{
      this.sub2 = this.http.Get(Admin.GetUsers).subscribe(res=>{
        // console.log(res.data);
        this.users = res.data;
        this.doctors = this.users.filter((u:any)=>{
          return u.status.includes('Doctor')
        })

        this.patients = this.users.filter((u:any)=>{
          return u.status.includes('Patient')
        })

      })
    })

    this.notify.hubConnection.on("EditUser",()=>{
      this.sub3 = this.http.Get(Admin.GetUsers).subscribe(res=>{
        // console.log(res.data);
        this.users = res.data;
        this.doctors = this.users.filter((u:any)=>{
          return u.status.includes('Doctor')
        })

        this.patients = this.users.filter((u:any)=>{
          return u.status.includes('Patient')
        })

      })
    })

    this.notify.hubConnection.on("NewUser",()=>{
      this.sub4 = this.http.Get(Admin.GetUsers).subscribe(res=>{
        // console.log(res.data);
        this.users = res.data;
        this.doctors = this.users.filter((u:any)=>{
          return u.status.includes('Doctor')
        })

        this.patients = this.users.filter((u:any)=>{
          return u.status.includes('Patient')
        })

      })
    })


  }

  AccessData(user:any){
    // debugger;
    // console.log(user.status);
    this.EditUserRole.controls['userName'].setValue(user?.email);
    this.EditUserRole.controls['roleName'].setValue(user?.status);

  }


  editUserRole(){
    // console.log(this.EditUserInfo.value);
    this.sub5 = this.http.Post(Admin.AddInRole,this.EditUserRole.value).subscribe(res=>{
      // console.log(res);
      if (res.error!=null) {
        // this.toast.error(res.error)
        this.error = res.error
      }
      else{
        this.toast.success(res.message)
      }

    })

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
  }

}
