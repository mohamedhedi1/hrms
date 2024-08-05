import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ListRoleComponent } from "./list-role/list-role.component";
import { AddRoleComponent } from "./add-role/add-role.component";
import { UpdateRoleComponent } from "./update-role/update-role.component";
import { RoleGuard } from "../../core/guards/role-guard.guard";
import { AddRoleGuard } from "../../core/guards/addrole-guard.guard";
import { UpdateRoleGuard } from "../../core/guards/updaterole-guard.guard";
import { AuthGuard } from "../../core/guards/auth-guard.guard";

const routes: Routes = [
    { path: '', component: ListRoleComponent, canActivate: [AuthGuard,RoleGuard] },
    { path: 'add', component: AddRoleComponent, canActivate: [AuthGuard,AddRoleGuard] },
    { path: 'update/:id', component: UpdateRoleComponent, canActivate: [AuthGuard,UpdateRoleGuard]}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RoleRoutingModule { }