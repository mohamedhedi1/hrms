import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDeductionComponent } from './list-deduction/list-deduction.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';
import { readAttGuard } from '../../core/guards/readAtt-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ListDeductionComponent,
    canActivate: [AuthGuard, readAttGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeductionRoutingModule {}
