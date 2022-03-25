import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-accesdenied',
  templateUrl: './accesdenied.component.html',
  styleUrls: ['./accesdenied.component.scss']
})
export class AccesdeniedComponent implements OnInit {

  user:any;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.user = this.auth.user.value;
  }
  navigate(){
    if (this.user.Status == "Admin") {
      this.router.navigate(['/dashboard/admin'])
    }
    if (this.user.Status == "Doctor") {
      this.router.navigate(['/dashboard/doctor'])
    }
    if (this.user.Status == "Patient") {
      this.router.navigate(['/dashboard/patient'])
    }
  }

}
