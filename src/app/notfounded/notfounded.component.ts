import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-notfounded',
  templateUrl: './notfounded.component.html',
  styleUrls: ['./notfounded.component.scss']
})
export class NotfoundedComponent implements OnInit {

  user:any;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.user = this.auth.user.value
  }

  navigate(){
   this.auth.validRole();
  }

}
