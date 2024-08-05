import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectCardComponent } from './projectCard/projectCard.component';
import { ListProjectsComponent } from './ListProjects/ListProjects.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { ProjectsEffects } from '../../core/state/project.effects';
import { projectsReducer } from '../../core/state/project.reducers';

@NgModule({
  declarations: [ProjectCardComponent, ListProjectsComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatCardModule,
    StoreModule.forFeature('projectState', projectsReducer),
    EffectsModule.forFeature([ProjectsEffects]),
    ToastModule,
  ],
})
export class ProjectManagementModule {}
