import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeductionRoutingModule } from './deduction-routing.module';
import { ListDeductionComponent } from './list-deduction/list-deduction.component';
import { UpdateDeductionComponent } from './update-deduction/update-deduction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ListDeductionComponent,
    UpdateDeductionComponent,
  ],
  imports: [
    CommonModule,
    DeductionRoutingModule,
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
export class DeductionModule {}
