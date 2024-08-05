import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListTaskComponent } from './list-task/list-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';
import { TaskGuard } from '../../core/guards/task-guard.guard';
import { PopupComponent } from './popup/popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { PopupupdateComponent } from './popupupdate/popupupdate.component';
const routes: Routes = [
  { path: '', component: ListTaskComponent , canActivate:[AuthGuard, TaskGuard ] },
  { path: 'AddTask', component: AddTaskComponent },
  { path: 'UpdateTask/:id', component: UpdateTaskComponent }
];

@NgModule({
  declarations: [
    AddTaskComponent,
    ListTaskComponent,
    UpdateTaskComponent,
    PopupComponent,
    PopupupdateComponent,  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,

  ],
  exports: [RouterModule],
})
export class TaskManagementModule { }