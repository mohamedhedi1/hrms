import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  URL = 'http://localhost:3000/missions';
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  constructor(private _http: HttpClient) {}
  getAvailableUser() {
    return this._http.get(this.URL + '/availableUsers');
  }

  getUserIdByEmail(email: string) {
    return this._http.get(this.URL + `/email/${email}`);
  }

  addMission(mission: any) {
    return this._http.post(this.URL, mission);
  }

  getAllMissions(): Observable<Mission[]> {
    return this._http.get<Mission[]>(this.URL);
  }

  deleteMission(id: string): Observable<void> {
    const deleteUrl = `${this.URL}/${id}`;
    return this._http.delete<void>(deleteUrl);
  }

  getUserNameById(userId: string): Observable<string> {
    const url = `${this.URL}/${userId}/username`;
    return this._http.get<string>(url);
  }
}
