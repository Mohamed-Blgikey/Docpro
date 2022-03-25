import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesdeniedComponent } from './accesdenied/accesdenied.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminGuard } from './core/Guard/admin.guard';
import { AuthGuard } from './core/Guard/auth.guard';
import { DoctorGuard } from './core/Guard/doctor.guard';
import { PatientGuard } from './core/Guard/patient.guard';
import { ReauthGuard } from './core/Guard/reauth.guard';
import { AdminComponent } from './dashboard/admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './dashboard/doctor/doctor.component';
import { PatientComponent } from './dashboard/patient/patient.component';
import { NotfoundedComponent } from './notfounded/notfounded.component';

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
        canActivate:[AdminGuard]
      },

      {
        path: 'doctor',
        component:DoctorComponent,
        canActivate:[DoctorGuard]
      },

      {
        path: 'patient',
        component:PatientComponent
        ,canActivate:[PatientGuard]
      },
    ]
  },
  {
    path:'accessdenied',
    component:AccesdeniedComponent
  }
,
  {
    path :'**',
    component:NotfoundedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
