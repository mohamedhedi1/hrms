import { PrismaService } from './../prisma.service';
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { Payroll, User } from '@prisma/client';
import { Public } from 'src/auth/common/decorators/public.decorator';

@Public()
@Controller('payrolls')
export class PayrollController {
  constructor(
    private readonly payrollService: PayrollService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async createPayroll(@Body() createPayrollDto: Payroll): Promise<Payroll> {
    return this.payrollService.createPayroll(createPayrollDto);
  }

  @Get()
  async getAllPayrolls(): Promise<Payroll[]> {
    return this.payrollService.getAllPayrolls();
  }

  @Get('/month/:month')
  async getPayrollsByMonth(@Param('month') month: Date): Promise<Payroll[]> {
    return this.payrollService.getPayrollsByMonth(new Date(month));
  }

  @Get('/user/:userId')
  async getPayrollsByUserId(
    @Param('userId') userId: string,
  ): Promise<Payroll[]> {
    return this.payrollService.getPayrollsByUserId(userId);
  }

  @Get('/getUserByEmail/:email')
  getUserIdByEmail(@Param('email') email: string): Promise<string | any> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
  }

  @Get('/getAllUsers')
  find(): Promise<User> {
    return this.payrollService.findAllUsers();
  }
}
