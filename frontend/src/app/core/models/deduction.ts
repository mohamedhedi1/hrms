import { User } from "./User";

export class Deduction {
  id!: string;
  userId!: string;
  description!: string;
  amount!: number;
  date!: string;
  user?: User;
}
