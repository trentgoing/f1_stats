import { Race } from './race';

export class Season {
  _id: number;
  year: number;
  url: string;
  races: [Race];
}
