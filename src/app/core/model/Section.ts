import { user } from "./user";

export interface Section {
  id: number;
  name: string;
  photoName: string;
  doctors: user[];
}
