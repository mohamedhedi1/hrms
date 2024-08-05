import { User } from './User';

export class Allowance {
  id!: string;
  userId!: string;
  description!: string;
  category!: AllowanceCategory;
  amount!: number;
  date!: string;
  user?: User;
}

export enum AllowanceCategory {
  FOOD = 'FOOD',
  TRANSPORTATION = 'TRANSPORTATION',
  LODGING = 'LODGING',
  ENTERTAINMENT = 'ENTERTAINMENT',
  MISCELLANEOUS = 'MISCELLANEOUS',
}
