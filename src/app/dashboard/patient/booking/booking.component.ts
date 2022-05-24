import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/core/APIS/Patient';
import { Section } from 'src/app/core/model/Section';
import { HttpService } from 'src/app/core/services/http.service';
import { NotifyService } from 'src/app/core/services/notify.service';
import { environment } from 'src/environments/environment';
import { AddbookComponent } from './addbook/addbook.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  private sub1:Subscription|undefined;
  private sub2:Subscription|undefined;
  private sub3:Subscription|undefined;
  private sub4:Subscription|undefined;


  sections:Section [] = [];
  imgPrefix : string = environment.PhotoUrl;

  constructor(private http:HttpService,private toast:HotToastService,private notify:NotifyService,public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(AddbookComponent,{data:{name:"6556"}});
  }

  ngOnInit(): void {


    this.sub1 = this.http.Get(Patient.GetSections).subscribe((res) => {
      // console.log(res.data) ;
      this.sections = res.data;
    });


    this.notify.hubConnection.on('AddSection', () => {
      this.sub2 = this.http.Get(Patient.GetSections).subscribe((res) => {
        // console.log(res.data) ;
        this.sections = res.data;
      });
    });


    this.notify.hubConnection.on('EditDoctor', () => {

      this.sub3 = this.http.Get(Patient.GetSections).subscribe((res) => {
        // console.log(res.data) ;
        this.sections = res.data;
      });

    });

    this.notify.hubConnection.on('DeleteDoctor', () => {

      this.sub4 = this.http.Get(Patient.GetSections).subscribe((res) => {
        this.sections = res.data;
      });
    });

  }


}
