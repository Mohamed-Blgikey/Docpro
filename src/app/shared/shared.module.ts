import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotToastModule } from '@ngneat/hot-toast';

import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    HotToastModule
  ],
})
export class SharedModule {}
