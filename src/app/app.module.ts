import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { SharedModule } from './shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { DoctorComponent } from './dashboard/doctor/doctor.component';
import { PatientComponent } from './dashboard/patient/patient.component';
import { AccesdeniedComponent } from './accesdenied/accesdenied.component';
import { NotfoundedComponent } from './notfounded/notfounded.component';
import { UserDetailResolver } from './core/resolvers/user.resolver';
import { DoctorsComponent } from './dashboard/admin/doctors/doctors.component';
import { PatientsComponent } from './dashboard/admin/patients/patients.component';
import { RolesComponent } from './dashboard/admin/roles/roles.component';
import { SectionComponent } from './dashboard/admin/section/section.component';
import { RequestsComponent } from './dashboard/admin/requests/requests.component';
import { DoctorpostsComponent } from './dashboard/doctor/doctorposts/doctorposts.component';
import { PostsComponent } from './dashboard/admin/posts/posts.component';
import { ReservationsComponent } from './dashboard/doctor/reservations/reservations.component';
import { WorktimeComponent } from './dashboard/doctor/worktime/worktime.component';
import { BookingComponent } from './dashboard/patient/booking/booking.component';
import { AddbookComponent } from './dashboard/patient/booking/addbook/addbook.component';
import { ExploreComponent } from './dashboard/patient/explore/explore.component';
import { AcceptedreservationComponent } from './dashboard/patient/acceptedreservation/acceptedreservation.component';
import { WorkscheduleComponent } from './dashboard/doctor/workschedule/workschedule.component';
import { SearchuserPipe } from './core/pipes/searchuser.pipe';
import { MyReportsComponent } from './dashboard/patient/my-reports/my-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    AdminComponent,
    DoctorComponent,
    PatientComponent,
    AccesdeniedComponent,
    NotfoundedComponent,
    DoctorsComponent,
    PatientsComponent,
    RolesComponent,
    SectionComponent,
    RequestsComponent,
    DoctorpostsComponent,
    PostsComponent,
    ReservationsComponent,
    WorktimeComponent,
    BookingComponent,
    AddbookComponent,
    ExploreComponent,
    AcceptedreservationComponent,
    WorkscheduleComponent,
    MyReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [UserDetailResolver,SearchuserPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
