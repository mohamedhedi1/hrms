import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollManagementRoutingModule } from './payroll-management-routing.module';
import { ListPayrollComponent } from './list-payroll/list-payroll.component';
import { ListUserPayrollComponent } from './list-user-payroll/list-user-payroll.component';

@NgModule({
  declarations: [ListPayrollComponent, ListUserPayrollComponent],
  imports: [CommonModule, PayrollManagementRoutingModule],
})
export class PayrollManagementModule {}
