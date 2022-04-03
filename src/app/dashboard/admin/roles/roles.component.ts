import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/APIS/User';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit ,OnDestroy{


  sub:Subscription|undefined;
  sub2:Subscription|undefined;
  users:any
  doctors:any;
  patients:any;
  roles:any ;
  error:string ='';
  EditUserRole:FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.email]),
    roleName: new FormControl('',[Validators.required])
  })

  imgPrefix : string = environment.PhotoUrl;

  constructor(private http:HttpService,private notify:NotifyService,private userService:UserService) { }

  ngOnInit(): void {
    this.sub = this.http.Get(User.GetUsers).subscribe(res=>{
      // console.log(res.data);
      this.users = res.data;
      this.doctors = this.users.filter((u:any)=>{
        return u.status.includes('Doctor')
      })

      this.patients = this.users.filter((u:any)=>{
        return u.status.includes('Patient')
      })

      this.sub2 = this.http.Get(User.GetRoles).subscribe(res=>{
        this.roles = res.data;
      })

    })


    this.notify.hubConnection.on("EditUserRole",()=>{
      this.sub = this.http.Get(User.GetUsers).subscribe(res=>{
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
      this.sub = this.http.Get(User.GetUsers).subscribe(res=>{
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
      this.sub = this.http.Get(User.GetUsers).subscribe(res=>{
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
    this.http.Post(User.AddInRole,this.EditUserRole.value).subscribe(res=>{
      // console.log(res);
      if (res.error!=null) {
        this.error = res.error
      }

    })

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub2?.unsubscribe();
  }

}
