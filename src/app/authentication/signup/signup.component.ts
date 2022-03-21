import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cpassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})


export class SignupComponent implements OnInit {

  hide:boolean = true
  chide:boolean = true
  loading:boolean = false;
  error:string = '';

  authForm:FormGroup = new FormGroup({
    firstName: new FormControl ('', [Validators.required]),
    lastName: new FormControl ('', [Validators.required]),
    email:new FormControl('',  [Validators.required, Validators.email, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cpassword:new FormControl('',[Validators.required, Validators.minLength(6)])
  },{validators:passwordsMatchValidator()});


  constructor(private auth:AuthService,private router:Router,private toast: HotToastService) { }

  ngOnInit(): void {
  }

  onSubmit(data:FormGroup){
    // console.log(data.value)
    let dataSend = {
      email: data.controls['email'].value,
      password: data.controls['password'].value,
      firstName: data.controls['firstName'].value,
      lastName: data.controls['lastName'].value
    }
    // console.log(dataSend);

    this.auth.signUp(dataSend)
    .pipe(
      this.toast.observe({
        success: 'Operation Done !',
        loading: 'Logging in...',
        error: ({ message }) => `There was an error: ${message} `,
      })
    ).subscribe(res=>{
      this.loading = true;
      if (res.message == "Success") {
        this.loading = false;
        this.router.navigate(["/signin"])
      }else{
        this.loading = false;
        this.error = res.message
      }
      // console.log(res);

    })

  }

  clear(){
    this.error = '';
  }

}
