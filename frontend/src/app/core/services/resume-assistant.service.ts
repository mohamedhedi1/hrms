import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeAssistantService {
  URL = 'http://localhost:3000/cvassistant/';
  constructor(private _http: HttpClient) {}

  getThread()
  {
    return this._http.get(this.URL);
  }
  
  sendMessage(body : any, threadId: string)
  {
    return this._http.post(this.URL+`sendMessage/${threadId}`,body)
  }



}
