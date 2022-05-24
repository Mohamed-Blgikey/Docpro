import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchuserPipe } from './pipes/searchuser.pipe';



@NgModule({
  declarations: [
    SearchuserPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
