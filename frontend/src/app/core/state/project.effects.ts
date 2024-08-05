import { ProjectManagementService } from './../services/projectManagement.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import {
  DeleteProjectActionError,
  DeleteProjectActionSuccess,
  EditProjectActionError,
  EditProjectActionSuccess,
  GetAllProjectsActionError,
  GetAllProjectsActionSuccess,
  NewProjectActionSuccess,
  ProjectsActionTypes,
  ProjectsActions,
  SaveProjectActionError,
  SaveProjectActionSuccess,
  UpdateProjectActionError,
  UpdateProjectActionSuccess,
} from './project.actions';

@Injectable()
export class ProjectsEffects {
  constructor(
    private projectService: ProjectManagementService,
    private effectActions: Actions
  ) {}

  getAllProjectsEffect: Observable<ProjectsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProjectsActionTypes.GET_All_PROJECTS),
      mergeMap((action: ProjectsActions) => {
        return this.projectService.getAllProjects().pipe(
          map((projects) => new GetAllProjectsActionSuccess(projects)),
          catchError((err) => of(new GetAllProjectsActionError(err.message)))
        );
      })
    )
  );

  // Delete Project
  deleteProjectEffect: Observable<ProjectsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProjectsActionTypes.DELETE_PROJECT),
      mergeMap((action: ProjectsActions) => {
        return this.projectService.deleteProject(action.payload.id).pipe(
          map(() => new DeleteProjectActionSuccess(action.payload)),
          catchError((err) => of(new DeleteProjectActionError(err.message)))
        );
      })
    )
  );

  // New Project
  newProjectEffect: Observable<ProjectsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProjectsActionTypes.NEW_PROJECT),
      map((action: ProjectsActions) => {
        return new NewProjectActionSuccess({});
      })
    )
  );

  // Save Project
  saveProjectEffect: Observable<ProjectsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProjectsActionTypes.SAVE_PROJECT),
      mergeMap((action: ProjectsActions) => {
        return this.projectService.createProject(action.payload).pipe(
          map((project) => new SaveProjectActionSuccess(project)),
          catchError((err) => of(new SaveProjectActionError(err.message)))
        );
      })
    )
  );

  // Edit Project
  editProjectEffect: Observable<ProjectsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProjectsActionTypes.EDIT_PROJECT),
      mergeMap((action: ProjectsActions) => {
        return this.projectService.getProjectById(action.payload).pipe(
          map((project) => new EditProjectActionSuccess(project)),
          catchError((err) => of(new EditProjectActionError(err.message)))
        );
      })
    )
  );

  // Update Project
  updateProjectEffect: Observable<ProjectsActions> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProjectsActionTypes.UPDATE_PROJECT),
      mergeMap((action: ProjectsActions) => {
        const { id, project } = action.payload;
        return this.projectService.updateProject(id, project).pipe(
          map((project) => new UpdateProjectActionSuccess(project)),
          catchError((err) => of(new UpdateProjectActionError(err.message)))
        );
      })
    )
  );
}
