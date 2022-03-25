import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../core/model/user';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user:User|any;
  imgPrefix:string = environment.PhotoUrl;
  constructor(private authService:AuthService) {
    this.user = this.authService.user.getValue()

  }

  ngOnInit(): void {
    // console.log(this.user);

  }

  logOut(){
    this.authService.logOut()
  }

}


