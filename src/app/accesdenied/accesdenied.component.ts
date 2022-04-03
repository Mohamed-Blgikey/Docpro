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
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.user.value;
  }
  navigate(){
    this.auth.validRole();
  }

}
