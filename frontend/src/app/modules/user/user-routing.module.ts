import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ListUserComponent } from "./list-user/list-user.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UserGuard } from "../../core/guards/user-guard.guard";
import { AuthGuard } from "../../core/guards/auth-guard.guard";
import { AddUserGuard } from "../../core/guards/adduser-guard.guard";
import { UpdateUserGuard } from "../../core/guards/updateuser-guard.guard";

const routes: Routes = [
    { path: '', component: ListUserComponent , canActivate:[AuthGuard,UserGuard] },
    { path: 'add', component: AddUserComponent, canActivate: [AuthGuard,AddUserGuard] },
    { path: 'update/:id', component: UpdateUserComponent, canActivate: [AuthGuard,UpdateUserGuard]}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

export class UserRoutingModule {}