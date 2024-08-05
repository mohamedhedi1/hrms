import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class PrivilegeService {
    URL= "http://localhost:3000/privileges"
    constructor(private _http: HttpClient){}

    getPrivileges(): any 
    {
      return this._http.get(this.URL);
    }
    

    
  }