import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllowanceRoutingModule } from './allowance-routing.module';
import { AddAllowanceComponent } from './add-allowance/add-allowance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAllowanceComponent } from './list-allowance/list-allowance.component';
import { UpdateAllowanceComponent } from './update-allowance/update-allowance.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AddAllowanceComponent,
    ListAllowanceComponent,
    UpdateAllowanceComponent,
  ],
  imports: [
    CommonModule,
    AllowanceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginator,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class AllowanceModule {}
