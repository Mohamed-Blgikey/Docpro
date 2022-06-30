import { user } from './user';

export interface post {
  id: number;
  date: Date;
  topic: string;
  catpion: string;
  doctorId: string;
  doctor: user;
  photoName: string;
  publicId:string;
}
