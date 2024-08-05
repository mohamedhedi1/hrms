import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  URL = 'http://localhost:3000/configs';
  constructor(private http: HttpClient) {}

  httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  addConfig(config: Config) {
    return this.http.post<Config>(this.URL, config, this.httpOtions);
  }
  getConfig() {
    return this.http.get<Config[]>(this.URL);
  }
  updateConfig(id: string, config: Config) {
    return this.http.put(this.URL, config, this.httpOtions);
  }
  deleteConfig(id: number) {
    return this.http.delete<Config>(this.URL + '/' + id, this.httpOtions);
  }
}
