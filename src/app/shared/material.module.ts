import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatToolbarModule,
  MatSelectModule,
  MatCardModule,
  MatDialogModule
];

@NgModule({
  declarations: [],
  imports: [materialModules],
  exports: [materialModules],
})
export class MaterialModule {}
