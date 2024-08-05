import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateAttendanceComponent } from './update-attendance/update-attendance.component';
import { AddAttendanceComponent } from './add-attendance/add-attendance.component';
import { ListAttendanceComponent } from './list-attendance/list-attendance.component';
import { CreateAttendanceComponent } from './create-attendance/create-attendance.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';
import { readAttGuard } from '../../core/guards/readAtt-guard.guard';
import { addAttGuard } from '../../core/guards/addAtt-guard.guard';
import { createAttGuard } from '../../core/guards/createAtt-guard.guard';
import { editAttGuard } from '../../core/guards/editAtt-guard.guard';

const routes: Routes = [
  { path: 'ListAttendance', component: ListAttendanceComponent, canActivate:[AuthGuard,readAttGuard]},
  { path: 'addAttendance', component: AddAttendanceComponent,  canActivate:[AuthGuard,addAttGuard] },
  { path: 'updateAttendance', component: UpdateAttendanceComponent, canActivate:[AuthGuard,editAttGuard] },
  { path: 'createAttendance', component: CreateAttendanceComponent, canActivate:[AuthGuard,createAttGuard]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttendanceManagementRoutingModule {}
