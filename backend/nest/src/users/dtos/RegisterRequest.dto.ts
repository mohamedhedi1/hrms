import { Role } from '@prisma/client';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  birthday: string;
  @IsNotEmpty()
  degree: string;
  @IsNotEmpty()
  number: number;
  
  @IsNotEmpty()
  basicSalary: number;
  @IsNotEmpty()
  offDays: number;
  @IsNotEmpty()
  familySituation: number;
  @IsNotEmpty()
  childrenNumber: number;
  @IsNotEmpty()
  bankrib: string;
  @IsNotEmpty()
  numCnss: string;
  @IsNotEmpty()
  cin: string;
  
  @IsNotEmpty()
  job: string;
  password: string;
  roles: Role[];
}
