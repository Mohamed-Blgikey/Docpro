import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/core/APIS/Patient';
import { reservation } from 'src/app/core/model/Reservation';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acceptedreservation',
  templateUrl: './acceptedreservation.component.html',
  styleUrls: ['./acceptedreservation.component.scss']
})
export class AcceptedreservationComponent implements OnInit,OnDestroy {

  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  AcceptedReservations:reservation [] = [];
  constructor(private http:HttpService,private notify:NotifyService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub1 = this.http.Get(Patient.GetAcceptedReservation).subscribe(res=>{
      // console.log(res.data);
      this.AcceptedReservations = res.data;
    })

    this.notify.hubConnection.on("confirmReservations",()=>{
      this.sub2 = this.http.Get(Patient.GetAcceptedReservation).subscribe(res=>{
        console.log(res.data);
        this.AcceptedReservations = res.data;
      })
    })

    this.notify.hubConnection.on("ReservationDone",()=>{
      this.sub2 = this.http.Get(Patient.GetAcceptedReservation).subscribe(res=>{
        // console.log(res.data);
        this.AcceptedReservations = res.data;
      })
    })
  }

}
