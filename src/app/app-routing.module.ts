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
import { UserDetailResolver } from './core/resolvers/user.resolver';
import { AdminComponent } from './dashboard/admin/admin.component';
import { DoctorsComponent } from './dashboard/admin/doctors/doctors.component';
import { PatientsComponent } from './dashboard/admin/patients/patients.component';
import { PostsComponent } from './dashboard/admin/posts/posts.component';
import { RequestsComponent } from './dashboard/admin/requests/requests.component';
import { RolesComponent } from './dashboard/admin/roles/roles.component';
import { SectionComponent } from './dashboard/admin/section/section.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './dashboard/doctor/doctor.component';
import { DoctorpostsComponent } from './dashboard/doctor/doctorposts/doctorposts.component';
import { ReservationsComponent } from './dashboard/doctor/reservations/reservations.component';
import { WorkscheduleComponent } from './dashboard/doctor/workschedule/workschedule.component';
import { WorktimeComponent } from './dashboard/doctor/worktime/worktime.component';
import { AcceptedreservationComponent } from './dashboard/patient/acceptedreservation/acceptedreservation.component';
import { AddbookComponent } from './dashboard/patient/booking/addbook/addbook.component';
import { BookingComponent } from './dashboard/patient/booking/booking.component';
import { ExploreComponent } from './dashboard/patient/explore/explore.component';
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
    canActivate: [ReauthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ReauthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      user: UserDetailResolver,
    },

    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            redirectTo: 'doctors',
            pathMatch: 'full',
          },
          {
            path: 'doctors',
            component: DoctorsComponent,
          },
          {
            path: 'patients',
            component: PatientsComponent,
          },
          {
            path: 'roles',
            component: RolesComponent,
          },
          {
            path: 'sections',
            component: SectionComponent,
          },
          {
            path: 'requests',
            component: RequestsComponent,
          },
          {
            path: 'posts',
            component: PostsComponent,
          },
        ],
      },

      {
        path: 'doctor',
        component: DoctorComponent,
        canActivate: [DoctorGuard],
        children: [
          {
            path: '',
            redirectTo: 'workTime',
            pathMatch: 'full',
          }
          ,
          {
            path: 'doctorposts',
            component: DoctorpostsComponent,
          }
          ,
          {
            path: 'Reservations',
            component: ReservationsComponent,
          }
          ,
          {
            path: 'workTime',
            component: WorktimeComponent,
          }
          ,
          {
            path:'workschedule',
            component:WorkscheduleComponent
          }
        ],
      },

      {
        path: 'patient',
        component: PatientComponent,
        canActivate: [PatientGuard],
        children:[
          {
            path:'',
            pathMatch:'full',
            redirectTo:'booking'
          }
          ,
          {
            path:'booking',
            component : BookingComponent
          }
          ,
          {
            path:'addbook/:id',
            component : AddbookComponent
          }
          ,
          {
            path:'posts',
            component:ExploreComponent
          }
          ,
          {
            path:'acceptedreservation',
            component:AcceptedreservationComponent
          }
        ]
      },
    ],
  },
  {
    path: 'accessdenied',
    component: AccesdeniedComponent,
  },
  {
    path: '**',
    component: NotfoundedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
