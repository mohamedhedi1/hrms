import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  URL = 'http://localhost:3000/roles';
  constructor(private _http: HttpClient) {}

  getRoles() {
    return this._http.get<Role[]>(this.URL);
  }

  getRoleById(id: string): any {
    return this._http.get(this.URL + `/${id}`);
  }

  addRole(role: any) {
    return this._http.post(this.URL, role);
  }

  updateRole(id: string, role: any) {
    return this._http.patch(this.URL + `/${id}`, role);
  }

  deleteRole(id: string) {
    return this._http.delete(this.URL + `/${id}`);
  }
}
