import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './ListProjects/ListProjects.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';
import { ProjectGuard } from '../../core/guards/project-guard.guard';

const routes: Routes = [{ path: '', component: ListProjectsComponent ,canActivate:[AuthGuard,ProjectGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {}
