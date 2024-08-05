import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigManagementRoutingModule } from './config-management-routing.module';
import { UpdateConfigComponent } from './update-config/update-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListConfigComponent } from './list-config/list-config.component';
import { ConfigService } from '../../core/services/config.service';

@NgModule({
  declarations: [ListConfigComponent, UpdateConfigComponent],
  imports: [
    CommonModule,
    ConfigManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ConfigService],
})
export class ConfigManagementModule {}
