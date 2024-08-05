import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListConfigComponent } from './list-config/list-config.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';
import { readAttGuard } from '../../core/guards/readAtt-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: ListConfigComponent,
    canActivate: [AuthGuard, readAttGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigManagementRoutingModule {}
