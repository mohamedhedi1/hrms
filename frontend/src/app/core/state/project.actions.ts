import { Action } from "@ngrx/store";
import { Project } from "../models/project";

export enum ProjectsActionTypes {
  // Get all Projects
  GET_All_PROJECTS = "[Projects] Get All Projects",
  GET_All_PROJECTS_SUCCESS = "[Projects] Get All Projects Success",
  GET_All_PROJECTS_ERROR = "[Projects] Get All Projects Error",

  // Delete Project
  DELETE_PROJECT = "[Project] Delete Project",
  DELETE_PROJECT_SUCCESS = "[Project] Delete Project Success",
  DELETE_PROJECT_ERROR = "[Project] Delete Project Error",

  // New Project
  NEW_PROJECT = "[Project] New Project",
  NEW_PROJECT_SUCCESS = "[Project] New Project Success",
  NEW_PROJECT_ERROR = "[Project] New Project Error",

  // Save Project
  SAVE_PROJECT = "[Project] Save Project",
  SAVE_PROJECT_SUCCESS = "[Project] Save Project Success",
  SAVE_PROJECT_ERROR = "[Project] Save Project Error",

  // Edit Project
  EDIT_PROJECT = "[Project] Edit Project",
  EDIT_PROJECT_SUCCESS = "[Project] Edit Project Success",
  EDIT_PROJECT_ERROR = "[Project] Edit Project Error",

  // Update Project
  UPDATE_PROJECT = "[Project] Update Project",
  UPDATE_PROJECT_SUCCESS = "[Project] Update Project Success",
  UPDATE_PROJECT_ERROR = "[Project] Update Project Error",
}

export class GetAllProjectsAction implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.GET_All_PROJECTS;
  constructor(public payload: any) {

  }
}

export class GetAllProjectsActionSuccess implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.GET_All_PROJECTS_SUCCESS;
  constructor(public payload: Project[]) {

  }
}

export class GetAllProjectsActionError implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.GET_All_PROJECTS_ERROR;
  constructor(public payload: string) {

  }
}


// Delete Project Actions
export class DeleteProjectAction implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.DELETE_PROJECT;
  constructor(public payload: Project) {

  }
}

export class DeleteProjectActionSuccess implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.DELETE_PROJECT_SUCCESS;
  constructor(public payload: any) {

  }
}

export class DeleteProjectActionError implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.DELETE_PROJECT_ERROR;
  constructor(public payload: string) {

  }
}

// New Project Actions
export class NewProjectAction implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.NEW_PROJECT;
  constructor(public payload: any) {

  }
}

export class NewProjectActionSuccess implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.NEW_PROJECT_SUCCESS;
  constructor(public payload: any) {

  }
}

export class NewProjectActionError implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.NEW_PROJECT_ERROR;
  constructor(public payload: string) {

  }
}

// Save Project Actions
export class SaveProjectAction implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.SAVE_PROJECT;
  constructor(public payload: Project) {

  }
}

export class SaveProjectActionSuccess implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.SAVE_PROJECT_SUCCESS;
  constructor(public payload: Project) {

  }
}

export class SaveProjectActionError implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.SAVE_PROJECT_ERROR;
  constructor(public payload: string) {

  }
}

// Edit Project Actions
export class EditProjectAction implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.EDIT_PROJECT;
  constructor(public payload: number) {
  }
}

export class EditProjectActionSuccess implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.EDIT_PROJECT_SUCCESS;
  constructor(public payload: Project) {

  }
}

export class EditProjectActionError implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.EDIT_PROJECT_ERROR;
  constructor(public payload: string) {

  }
}

// Update Project Actions
export class UpdateProjectAction implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.UPDATE_PROJECT;
  constructor(public payload: { id: string, project: any }) {
  }
}

export class UpdateProjectActionSuccess implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.UPDATE_PROJECT_SUCCESS;
  constructor(public payload: any) {

  }
}

export class UpdateProjectActionError implements Action {
  type: ProjectsActionTypes = ProjectsActionTypes.UPDATE_PROJECT_ERROR;
  constructor(public payload: string) {

  }
}


export type ProjectsActions =
  GetAllProjectsAction | GetAllProjectsActionSuccess | GetAllProjectsActionError
  | DeleteProjectAction | DeleteProjectActionSuccess | DeleteProjectActionError
  | NewProjectAction | NewProjectActionSuccess | NewProjectActionError
  | SaveProjectAction | SaveProjectActionSuccess | SaveProjectActionError
  | EditProjectAction | EditProjectActionSuccess | EditProjectActionError
  | UpdateProjectAction | UpdateProjectActionSuccess | UpdateProjectActionError;
