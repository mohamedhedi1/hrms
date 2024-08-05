import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth-guard.guard";
import { AddMissionComponent } from "./add-mission/add-mission.component";
import { ListMissionComponent } from "./list-mission/list-mission.component";

const routes: Routes = [
  { path: '', component: ListMissionComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddMissionComponent, canActivate: [AuthGuard] },
   
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class MissionRoutingModule {}