import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayrollComponent } from './list-payroll/list-payroll.component';
import { ListUserPayrollComponent } from './list-user-payroll/list-user-payroll.component';

const routes: Routes = [
  {
    path: '',
    component: ListPayrollComponent,
  },
  {
    path: 'payslip',
    component: ListUserPayrollComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollManagementRoutingModule {}
