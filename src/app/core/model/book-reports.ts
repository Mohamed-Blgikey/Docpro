import { user } from "./user";

export interface BookReports {
  id:number;
  day:string;
  from : string;
  to : string;
  diagnosis:string;
  treatment:string;
  date:Date;
  doctorId:string;
  doctor:user
  PatientId:string;
  patient:user;
}
