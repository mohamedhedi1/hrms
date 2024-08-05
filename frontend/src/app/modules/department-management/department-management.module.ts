import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDepartementComponent } from './add-departement/add-departement.component';
import { ListDepartementComponent } from './list-departement/list-departement.component';
import { UpdateDepartementComponent } from './update-departement/update-departement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'',component:ListDepartementComponent},
  {path:'AddDepartment',component:AddDepartementComponent},
  {path:'UpdateDepartment/:id',component:UpdateDepartementComponent}

  
]

@NgModule({
  declarations: [
  
    AddDepartementComponent,
       ListDepartementComponent,
       UpdateDepartementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  
})
export class DepartmentManagementModule { }
