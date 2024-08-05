import { Action } from '@ngrx/store';
import { Project, ProjectStatus } from '../models/project';
import { ProjectsActionTypes, ProjectsActions } from './project.actions';
export enum ProjectsStateEnum {
  NEW = 'New',
  Edit = 'Edit',
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
  UPDATED = 'Updated',
  DELETED = 'Deleted',
}
export interface ProjectsState {
  projects: Project[];
  errorMessage: string;
  dataState: ProjectsStateEnum;
  currentProject: Project | null;
  currentAction: ProjectsActions | null;
  todo: Project[];
  done: Project[];
  finished: Project[];
  numProjectsTodo: number;
  numProjectsDone: number;
  numProjectsFinished: number;
}

const initState: ProjectsState = {
  projects: [],
  errorMessage: '',
  dataState: ProjectsStateEnum.INITIAL,
  currentProject: null,
  currentAction: null,
  todo: [],
  done: [],
  finished: [],
  numProjectsTodo: 0,
  numProjectsDone: 0,
  numProjectsFinished: 0,
};
export function projectsReducer(
  state = initState,
  action: Action
): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.GET_All_PROJECTS:
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADING,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.GET_All_PROJECTS_SUCCESS:
      const projects = (<ProjectsActions>action).payload;
      const todo = projects.filter(
        (project: Project) => project.projectStatus === ProjectStatus.ON_HOLD
      );
      const done = projects.filter(
        (project: Project) => project.projectStatus === ProjectStatus.RUNNING
      );
      const finished = projects.filter(
        (project: Project) => project.projectStatus === ProjectStatus.FINISHED
      );

      return {
        ...state,
        dataState: ProjectsStateEnum.LOADED,
        projects: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
        todo,
        done,
        finished,
        numProjectsTodo: todo.length,
        numProjectsDone: done.length,
        numProjectsFinished: finished.length,
      };
    case ProjectsActionTypes.GET_All_PROJECTS_ERROR:
      return {
        ...state,
        dataState: ProjectsStateEnum.ERROR,
        errorMessage: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
      };

    // Delete Project
    case ProjectsActionTypes.DELETE_PROJECT:
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADING,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.DELETE_PROJECT_SUCCESS:
      let p: Project = (<ProjectsActions>action).payload;
      let index = state.projects.indexOf(p);
      let list = [...state.projects];
      list.splice(index, 1);
      return {
        ...state,
        dataState: ProjectsStateEnum.DELETED,
        projects: list,
        currentProject: null,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.DELETE_PROJECT_ERROR:
      return {
        ...state,
        dataState: ProjectsStateEnum.ERROR,
        errorMessage: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
      };

    // New Project
    case ProjectsActionTypes.NEW_PROJECT:
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADING,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.NEW_PROJECT_SUCCESS:
      return {
        ...state,
        dataState: ProjectsStateEnum.NEW,
        currentProject: null,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.NEW_PROJECT_ERROR:
      return {
        ...state,
        dataState: ProjectsStateEnum.ERROR,
        errorMessage: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
      };

    // Save Project
    case ProjectsActionTypes.SAVE_PROJECT:
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADING,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.SAVE_PROJECT_SUCCESS:
      let projs: Project[] = [...state.projects];
      projs.push((<ProjectsActions>action).payload);
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADED,
        projects: projs,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.SAVE_PROJECT_ERROR:
      return {
        ...state,
        dataState: ProjectsStateEnum.ERROR,
        errorMessage: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
      };

    // Edit Project
    case ProjectsActionTypes.EDIT_PROJECT:
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADING,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADED,
        currentProject: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.EDIT_PROJECT_ERROR:
      return {
        ...state,
        dataState: ProjectsStateEnum.ERROR,
        errorMessage: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
      };

    // Update Project
    case ProjectsActionTypes.UPDATE_PROJECT:
      return {
        ...state,
        dataState: ProjectsStateEnum.LOADING,
        currentAction: <ProjectsActions>action,
      };
    case ProjectsActionTypes.UPDATE_PROJECT_SUCCESS:
      const updatedProject: Project = (<ProjectsActions>action).payload;
      const prevStatus = state.projects.find(
        (project) => project.id === updatedProject.id
      )?.projectStatus;

      // Update project list
      const updatedProjects = state.projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );

      // Update project counts based on previous and new status
      let updatedTodo = state.todo.slice();
      let updatedDone = state.done.slice();
      let updatedFinished = state.finished.slice();
      let numProjectsTodo = state.numProjectsTodo;
      let numProjectsDone = state.numProjectsDone;
      let numProjectsFinished = state.numProjectsFinished;

      switch (prevStatus) {
        case ProjectStatus.ON_HOLD:
          updatedTodo = state.todo.filter((p) => p.id !== updatedProject.id);
          numProjectsTodo--;
          break;
        case ProjectStatus.RUNNING:
          updatedDone = state.done.filter((p) => p.id !== updatedProject.id);
          numProjectsDone--;
          break;
        case ProjectStatus.FINISHED:
          updatedFinished = state.finished.filter(
            (p) => p.id !== updatedProject.id
          );
          numProjectsFinished--;
          break;
      }

      switch (updatedProject.projectStatus) {
        case ProjectStatus.ON_HOLD:
          updatedTodo.push(updatedProject);
          numProjectsTodo++;
          break;
        case ProjectStatus.RUNNING:
          updatedDone.push(updatedProject);
          numProjectsDone++;
          break;
        case ProjectStatus.FINISHED:
          updatedFinished.push(updatedProject);
          numProjectsFinished++;
          break;
      }

      return {
        ...state,
        dataState: ProjectsStateEnum.UPDATED,
        projects: updatedProjects,
        currentProject: null,
        currentAction: <ProjectsActions>action,
        todo: updatedTodo,
        done: updatedDone,
        finished: updatedFinished,
        numProjectsTodo,
        numProjectsDone,
        numProjectsFinished,
      };
    case ProjectsActionTypes.UPDATE_PROJECT_ERROR:
      return {
        ...state,
        dataState: ProjectsStateEnum.ERROR,
        errorMessage: (<ProjectsActions>action).payload,
        currentAction: <ProjectsActions>action,
      };

    default:
      return { ...state };
  }
}
