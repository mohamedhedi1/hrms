import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest } from "../models/AuthentificationRequest";
import { AuthenticationResponse } from "../models/AuthentificationResponse";
@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    URL = 'http://localhost:3000/auth/local/signin'
    LOGOUT_URL ='http://localhost:3000/auth/logout'
    CODE_URL ='http://localhost:3000/auth/sendsmscode/'
    CODE_URL_MAIL ='http://localhost:3000/auth/sendmailcode/'
    VERIFY_URL= 'http://localhost:3000/auth/verifyCode/'
    constructor(private _http:HttpClient) { }

    verifyCode(code: string,email:string) {
      return this._http.post<any>(this.VERIFY_URL+`${email}/${code}`,null)
    }

    sendVerificationCodeMail(email: string) {
      return this._http.post<any>(this.CODE_URL_MAIL+email, null);
     }
    sendVerificationCode(email: string) {
     return this._http.post<any>(this.CODE_URL+email, null);
    }

    login(
        authRequest: AuthenticationRequest
      ) {
        return this._http.post<AuthenticationResponse>
        (this.URL, authRequest);
      }

      _is_logged(): boolean {
        return !!localStorage.getItem('token');
    }

    logout()
    {
      return this._http.post<any>(this.LOGOUT_URL, {});
    }

  }