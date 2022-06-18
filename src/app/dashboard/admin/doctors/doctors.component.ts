import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { filter, Subscription } from 'rxjs';
import { Admin } from 'src/app/core/APIS/Admin';
import { Patient } from 'src/app/core/APIS/Patient';
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

  deleteModal:any;

  private sub:Subscription|undefined;
  private sub1:Subscription|undefined;
  private sub2:Subscription|undefined;
  private sub3:Subscription|undefined;
  private sub4:Subscription|undefined;
  private sub5:Subscription|undefined;
  private sub6:Subscription|undefined;
  private sub7:Subscription|undefined;
  private sub8:Subscription|undefined;
  doctors:any;
  freeDoctors:any;
  sections:any;
  imgPrefix : string = environment.PhotoUrl;

  DeleteUserF:FormGroup = new FormGroup({
    id: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.email,Validators.required]),
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
})

  changeDoctorForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    sectionId:new FormControl(null,[Validators.required])
  })

  constructor(private http:HttpService,private toast:HotToastService,private notify:NotifyService) { }


  ngOnInit(): void {

    this.sub = this.http.Get(Admin.GetDoctors).subscribe(res=>{
      // console.log(res.data);
      this.doctors = res.data
      this.freeDoctors = this.doctors.filter((m:any)=>{
        return m.sectionId == 0;
      })
      // console.log(this.freeDoctors);
    })

    this.sub4 = this.http.Get(Patient.GetSections).subscribe((res) => {
      // console.log(res.data) ;
      this.sections = res.data;
    });


    this.notify.hubConnection.on('AddSection', () => {
      this.sub5 = this.http.Get(Patient.GetSections).subscribe((res) => {
        // console.log(res.data) ;
        this.sections = res.data;
      });
    });





    this.notify.hubConnection.on('addDoctorToSection', () => {

      this.sub7 = this.http.Get(Patient.GetSections).subscribe((res) => {
        // console.log(res.data) ;
        this.sections = res.data;
      });

      this.sub3 = this.http.Get(Admin.GetDoctors).subscribe(res=>{
        // console.log(res.data);
        this.doctors = res.data;
        this.freeDoctors = this.doctors.filter((m:any)=>{
          return m.sectionId == 0;
        })
      })
    });

    this.notify.hubConnection.on('DeleteDoctor', () => {

      this.sub7 = this.http.Get(Patient.GetSections).subscribe((res) => {
        // console.log(res.data) ;
        this.sections = res.data;
      });

      this.sub3 = this.http.Get(Admin.GetDoctors).subscribe(res=>{
        // console.log(res.data);
        this.doctors = res.data;
        this.freeDoctors = this.doctors.filter((m:any)=>{
          return m.sectionId == 0;
        })
      })
    });

  }


  changeDoctor(){
    // console.log(this.changeDoctorForm.value);
    this.sub6 = this.http.Post(Admin.addDoctorToSection,this.changeDoctorForm.value)
    .subscribe(res=>{
      // console.log(res);
      if (res.error != null) {
        this.toast.error(res.error)
      }
      else{
        this.toast.success("Doctor Changed !")
      }
    })
  }



  AccessDeletedDate(user:any){
    // console.log(user);
    let name = user.fullName.split(' ');
    this.DeleteUserF.controls['id'].setValue(user.id)
    this.DeleteUserF.controls['email'].setValue(user.email)
    this.DeleteUserF.controls['firstName'].setValue(name[0])
    this.DeleteUserF.controls['lastName'].setValue(name[1])
  }


  DeleteUser(){
    // console.log(this.DeleteUserF.value);
    this.sub1 = this.http.Post(`${Admin.DeleteUser}/${this.DeleteUserF.controls['id'].value}`)
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
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
    this.sub7?.unsubscribe();
  }

}
