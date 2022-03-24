import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard } from './core/Guard/auth.guard';
import { ReauthGuard } from './core/Guard/reauth.guard';
import { AdminComponent } from './dashboard/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './dashboard/doctor/doctor.component';
import { PatientComponent } from './dashboard/patient/patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate : [ReauthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate : [ReauthGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard],

    children:[
      {
        path: 'admin',
        component:AdminComponent,
      },

      {
        path: 'doctor',
        component:DoctorComponent
      },

      {
        path: 'patient',
        component:PatientComponent
      },
    ]
  }
// ,
//   {
//     path :'**',
//     component:DashboardComponent
//   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
