import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  error: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private auth: AuthService,private router:Router) {}

  ngOnInit(): void {}

  signin(data: FormGroup) {
    // console.log(data.value);
    this.auth.signin(data.value)
    .subscribe((res) => {
      this.loading = true;
      if (res.message == 'Success') {
        // console.log(res);
        this.loading = false;
        localStorage.setItem('userToken', res.token);
        this.auth.saveUserData();
        this.router.navigate(['/'])
      } else {
        this.loading = false;
        // console.log(res.message);
        this.error = res.message;
      }
    });
  }
}
