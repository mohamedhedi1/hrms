import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { ProjectManagementService } from '../../../core/services/projectManagement.service'; // Assuming ProjectManagementService is imported
import { Project, ProjectStatus } from '../../../core/models/project';
import {
  ProjectsState,
  ProjectsStateEnum,
} from '../../../core/state/project.reducers';
import {
  GetAllProjectsAction,
  NewProjectAction,
  ProjectsActionTypes,
  UpdateProjectAction,
} from '../../../core/state/project.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ListProjects',
  templateUrl: './ListProjects.component.html',
  styleUrls: ['./ListProjects.component.css'],
})
export class ListProjectsComponent implements OnInit {
  projects!: Project[];
  todo!: Project[];
  done!: Project[];
  finished!: Project[];
  numProjectsTodo!: number;
  numProjectsDone!: number;
  numProjectsFinished!: number;

  ////////////// State Management Attributes //////////////////////////////

  state!: ProjectsState;
  readonly ProjectsActionTypes = ProjectsActionTypes;
  readonly ProjectsStateEnum = ProjectsStateEnum;

  //////////////////////////////////////////////////////////////////////////

  constructor(
    private projectService: ProjectManagementService,
    private store: Store<any>,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.store.dispatch(new NewProjectAction({}));
    this.subscribeToStateChanges();
    this.onGetAllProjects();
  }

  handleDrop(event: CdkDragDrop<Project[]>, newStatus: string) {
    const newK = this.stringToProjectStatus(newStatus);
    this.drop(event, newK);
  }

  stringToProjectStatus(statusString: string): ProjectStatus {
    switch (statusString) {
      case 'ON_HOLD':
        return ProjectStatus.ON_HOLD;
      case 'RUNNING':
        return ProjectStatus.RUNNING;
      case 'FINISHED':
        return ProjectStatus.FINISHED;
      default:
        throw new Error(`Invalid project status: ${statusString}`);
    }
  }

  /////////////////////// Dispatch services /////////////////////////////////////////////////

  onGetAllProjects() {
    this.store.dispatch(new GetAllProjectsAction({}));
  }

  private subscribeToStateChanges(): void {
    this.store.select('projectState').subscribe((state) => {
      this.state = state;
      if (this.state.dataState === ProjectsStateEnum.LOADED) {
        this.updateProjectLists();
      }
      if (this.state?.dataState === ProjectsStateEnum.NEW) {
        // this.initializeForm();
      } else if (this.state?.dataState === ProjectsStateEnum.ERROR) {
        this.showMessage(ProjectsStateEnum.ERROR);
      } else if (this.state?.dataState === ProjectsStateEnum.UPDATED) {
        this.showMessage(ProjectsStateEnum.UPDATED);
        this.store.dispatch(new NewProjectAction({}));
      } else if (this.state?.dataState === ProjectsStateEnum.DELETED) {
        this.showMessage(ProjectsStateEnum.DELETED);
        this.store.dispatch(new NewProjectAction({}));
      } else if (this.state?.dataState === ProjectsStateEnum.LOADED) {
        this.showMessage(ProjectsStateEnum.LOADED);
        this.store.dispatch(new NewProjectAction({}));
      }
    });
  }
  updateProjectLists() {
    this.todo = this.state.todo;
    this.done = this.state.done;
    this.finished = this.state.finished;
    this.numProjectsTodo = this.state.numProjectsTodo;
    this.numProjectsDone = this.state.numProjectsDone;
    this.numProjectsFinished = this.state.numProjectsFinished;
  }

  drop(event: CdkDragDrop<Project[]>, newStatus: ProjectStatus) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const movedProject: Project =
        event.previousContainer.data[event.previousIndex];
      if (movedProject && movedProject.id) {
        const updatedProject = {
          name: movedProject.name,
          description: movedProject.description,
          projectStatus: newStatus,
          usersIds: movedProject.usersIds,
          leader: movedProject.leader,
          startDate: movedProject.startDate,
          endDate: movedProject.endDate,
        };

        // Dispatch action to update project status
        if (updatedProject) {
          this.store.dispatch(
            new UpdateProjectAction({
              id: movedProject.id,
              project: updatedProject,
            })
          );
        }
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        this.showMessage(ProjectsStateEnum.ERROR);
      }
    }
  }
  showSuccessToast(message: string): void {
    this.messageService.add({
      severity: 'Info',
      summary: 'Success',
      detail: message,
      life: 5000,
      styleClass: 'custom-toast',
    });
  }

  showMessage(dataState: ProjectsStateEnum, message?: string) {
    let msg = '';
    let type = 'success';

    switch (dataState) {
      case ProjectsStateEnum.LOADED:
        msg = message || 'Projects Loaded successfully!';

        this.showSuccessToast(msg);
        break;
      case ProjectsStateEnum.ERROR:
        msg = message || 'An error occurred!';
        type = 'error';
        break;
      case ProjectsStateEnum.UPDATED:
        msg = message || 'Project updated successfully!';
        this.showSuccessToast(msg);
        break;
      case ProjectsStateEnum.NEW:
        msg = message || 'Operation successful!';
        this.showSuccessToast(msg);
        break;
      case ProjectsStateEnum.DELETED:
        msg = message || 'Project deleted successfully!';
        this.showSuccessToast(msg);
        break;
      default:
        break;
    }
  }
}
