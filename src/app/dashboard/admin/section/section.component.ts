import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/core/APIS/Admin';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  sections:any;

  constructor(private http:HttpService) { }

  ngOnInit(): void {
    this.http.Get(Admin.GetSections).subscribe(res=>{
      // console.log(res.data) ;
      this.sections = res.data
    })

    // this.http.Get(`${Admin.GetSection}/2`).subscribe(res=>{
    //   console.log(res.data);
    // })
  }

}
