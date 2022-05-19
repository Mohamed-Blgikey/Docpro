import { Component, OnInit } from '@angular/core';
import { routingAnimation } from 'src/app/animate/animate.component';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  animations: [routingAnimation],
})
export class DoctorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
