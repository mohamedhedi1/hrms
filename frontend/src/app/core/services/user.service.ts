import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  URL = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) {}
  getSettings(email: string) {
    return this._http.get<any>(this.URL+`/settings/${email}`)
  }
  setSettings(email: string,body: any) {
    return this._http.patch<any>(this.URL+`/settings/${email}`,body)
  }

  getUser(email: any) {
    return this._http.get<any>(this.URL + '/UserPrivilegesByEmail/' + email);
  }

  getAllUsers(): any {
    return this._http.get(this.URL);
  }

  addUser(user: any) {
    return this._http.post(this.URL, user);
  }

  deleteUser(id: string) {
    return this._http.delete(this.URL + `/${id}`);
  }

  getUserByEmail(email: string) {
    return this._http.get(this.URL + `/email/${email}`);
  }
  getUserById(id: string) {
    return this._http.get(this.URL + `/${id}`);
  }

  updateUser(id: string, user: any) {
    return this._http.patch(this.URL + `/${id}`, user);
  }
  uploadImage(image : any)
  {
    return this._http.post(this.URL+"/upload",image);
  }
  uploadProfileImage(email: string , image : string)
  {
    const body ={
      image : image
    }
    return this._http.patch(this.URL+`/uploadImage/${email}`,body)
  }
}
