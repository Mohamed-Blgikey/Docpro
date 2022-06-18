import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/APIS/User';
import { BookReports } from 'src/app/core/model/book-reports';
import { HttpService } from 'src/app/core/services/http.service';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { NotifyService } from 'src/app/core/services/notify.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-reports',
  templateUrl: './my-reports.component.html',
  styleUrls: ['./my-reports.component.scss'],
})
export class MyReportsComponent implements OnInit, OnDestroy {
  sub1: Subscription | undefined;
  p: number = 1;
  totalItems: number = 0;
  itemPerPage: number = 0;
  BookReports: BookReports[] = [];

  constructor(private http: HttpService, private notify: NotifyService) {}

  ngOnInit(): void {
    this.loadReports();

    this.notify.hubConnection.on('ReservationDone', () => {
      // console.log("asd");
      this.loadReports();
    });
  }

  pageChanged() {
    this.loadReports();
  }

  private loadReports() {
    this.sub1 = this.http
      .Get(`${User.GetReports}?PageNumber=${this.p}&PageSize=50`)
      .subscribe((res) => {
        this.totalItems = res.totalItems;
        this.itemPerPage = res.pageSize;
        this.BookReports = res.data;
        // console.log(this.BookReports);
      });
  }
  PrintAll() {
    var data: any = document.getElementById('print');
    html2canvas(data, {
      onclone: function (clonedDoc: any) {
        clonedDoc.getElementById('print').style.display = 'block';
      },
    }).then((canvas: any) => {
      var imgWidth = 195;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // pdf.save('MYPdf.pdf');//save pdf
      // pdf.output('dataurlnewwindow'); //with firefox only
      window.open(pdf.output('bloburl'), '_blank'); // with all browsers new page
    });
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
  }
}
