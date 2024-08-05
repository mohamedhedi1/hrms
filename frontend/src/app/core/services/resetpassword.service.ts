import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {
  private baseUrl = 'http://localhost:3000/passwordreset'

  constructor(
    private http: HttpClient
  ) { }
  
  request(email : string) : Observable<string>
  {
    const params = new HttpParams()
    .set('email', email);
    return this.http.post<any>
    (`${this.baseUrl}/request`, null, {params});
  }

  reset(
    token : string, password : string
  )
  {
    const params = new HttpParams()
    .set('token', token)
    .set('password', password);
    return this.http.post
    (`${this.baseUrl}/reset`,  null, 
    { params } );
  }
  
  
}
