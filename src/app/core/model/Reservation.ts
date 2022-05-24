import { user } from './user';

export interface reservation {
  day: string;
  from: string;
  to: string;
  date:Date
  doctorId: string;
  doctor?: user;
  patientId: string;
  patient?: user;
}
