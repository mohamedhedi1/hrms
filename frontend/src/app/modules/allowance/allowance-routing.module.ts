import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth-guard.guard';
import { readAttGuard } from '../../core/guards/readAtt-guard.guard';
import { ListAllowanceComponent } from './list-allowance/list-allowance.component';

const routes: Routes = [
  {
    path: '',
    component: ListAllowanceComponent,
    canActivate: [AuthGuard, readAttGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllowanceRoutingModule {}
