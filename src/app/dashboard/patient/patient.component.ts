import { Component, OnInit } from '@angular/core';
import { routingAnimation } from 'src/app/animate/animate.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  animations:[routingAnimation]
})
export class PatientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
