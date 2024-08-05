import { PayrollManagementModule } from './modules/payroll-management/payroll-management.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { ResetpasswordComponent } from './modules/resetpassword-component/resetpassword.component';
import { NewpasswordComponent } from './modules/newpassword/newpassword.component';
import { EmailsendedComponent } from './modules/emailsended/emailsended.component';
import { RoleGuard } from './core/guards/role-guard.guard';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { HomeGuard } from './core/guards/home-guard.guard';
import { HomeComponent } from './modules/home/home.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ConfigManagementModule } from './../app/modules/config-management/config-management.module';
import { SendcodeComponent } from './modules/sendcode/sendcode.component';
import { RecruitementAssistantComponent } from './modules/recruitement-assistant/recruitement-assistant.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'sendcode',
    component: SendcodeComponent,
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
  },
  {
    path: 'newpassword',
    component: NewpasswordComponent,
  },
  {
    path: 'emailsended',
    component: EmailsendedComponent,
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'missions',
        loadChildren: () =>
          import('./modules/mission/mission.module').then((m) => m.MissionModule),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./modules/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'config',
        loadChildren: () =>
          import(
            './../app/modules/config-management/config-management.module'
          ).then((m) => m.ConfigManagementModule),
      },

      {
        path: 'holiday',
        loadChildren: () =>
          import('./modules/holiday-management/holiday-management.module').then(
            (m) => m.HolidayManagementModule
          ),
      },
      {
        path: 'department',
        loadChildren: () =>
          import(
            './modules/department-management/department-management.module'
          ).then((m) => m.DepartmentManagementModule),
      },

      {
        path: 'attendance',
        loadChildren: () =>
          import(
            './modules/attendance-management/attendance-management.module'
          ).then((m) => m.AttendanceManagementModule),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./modules/task/task.module').then(
            (m) => m.TaskManagementModule
          ),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./modules/project-management/project-management.module').then(
            (m) => m.ProjectManagementModule
          ),
      },
      {
        path: 'payroll',
        loadChildren: () =>
          import(
            './../app/modules/payroll-management/payroll-management.module'
          ).then((m) => m.PayrollManagementModule),
      },
      {
        path: 'allowance',
        loadChildren: () =>
          import('./../app/modules/allowance/allowance-routing.module').then(
            (m) => m.AllowanceRoutingModule
          ),
      },
      {
        path: 'deduction',
        loadChildren: () =>
          import('./../app/modules/deduction/deduction-routing.module').then(
            (m) => m.DeductionRoutingModule
          ),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
