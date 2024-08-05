import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MissionRoutingModule } from './mission-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    AddMissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MissionRoutingModule,
    MatTableModule,
    MatPaginator,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    
  ]
})
export class MissionModule { }
