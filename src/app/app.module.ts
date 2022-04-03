import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
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
    SectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot(),
    SharedModule
  ],
  providers: [UserDetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
