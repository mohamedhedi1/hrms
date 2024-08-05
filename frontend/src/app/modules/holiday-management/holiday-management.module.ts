import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListHolidayComponent } from './list-holiday/list-holiday.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateHolidayComponent } from './update-holiday/update-holiday.component';
import { HolidayGuard } from '../../core/guards/holiday-guard.guard';
import { AuthGuard } from '../../core/guards/auth-guard.guard';

const routes: Routes = [
  {path:'',component:ListHolidayComponent, canActivate:[AuthGuard,]},
  {path:'add',component:AddHolidayComponent},
  {path:'Update/:id',component:UpdateHolidayComponent}

  
]

@NgModule({
  declarations: [
    AddHolidayComponent,ListHolidayComponent, UpdateHolidayComponent
  ],
  imports: [
    
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class HolidayManagementModule { }
