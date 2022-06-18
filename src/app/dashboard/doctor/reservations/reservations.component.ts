import { Component, OnDestroy, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/core/APIS/Doctor';
import { reservation } from 'src/app/core/model/Reservation';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit,OnDestroy {

  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  sub4:Subscription|undefined;
  sub5:Subscription|undefined;
  sub6:Subscription|undefined;
  imgPrefix:string = environment.PhotoUrl;
  Reservations:reservation[] = [];
  constructor(private http:HttpService,private notify:NotifyService,private toast:HotToastService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.sub5?.unsubscribe();
    this.sub6?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub1 = this.http.Get(Doctor.GetReservation).subscribe(res=>{
      this.Reservations = res.data
      // console.log(this.Reservations);
    })

    this.notify.hubConnection.on("BookDoctor",()=>{
      this.sub2 = this.http.Get(Doctor.GetReservation).subscribe(res=>{
        this.Reservations = res.data
        // console.log(this.Reservations);
      })
    })

    this.notify.hubConnection.on("confirmReservations",()=>{
      this.sub3 = this.http.Get(Doctor.GetReservation).subscribe(res=>{
        this.Reservations = res.data
        // console.log(this.Reservations);
      })
    })

    this.notify.hubConnection.on("RefuseReservations",()=>{
      this.sub6 = this.http.Get(Doctor.GetReservation).subscribe(res=>{
        this.Reservations = res.data
        // console.log(this.Reservations);
      })
    })

  }

  ConfirmReservation(patientId:string){
    // console.log(patientId);
    this.sub4 = this.http.Post(`${Doctor.confirmReservation}/${patientId}`).subscribe(res=>{
      // console.log(res.data);
      this.toast.success(res.data)
    })
  }

  RefuseReservation(patientId:string){
    this.sub5 = this.http.Post(`${Doctor.RefuseReservation}/${patientId}`).subscribe(res=>{
      this.toast.success(res.data);
    })
  }

}
