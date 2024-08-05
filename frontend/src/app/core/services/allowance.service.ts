import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Allowance } from '../models/allowance';

@Injectable({
  providedIn: 'root',
})
export class AllowanceService {
  private URL = 'http://localhost:3000/allowances';
  private _listners = new Subject<any>();
   listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }

  constructor(private http: HttpClient) {}

  createAllowance(allowance: Allowance): Observable<Allowance> {
    return this.http.post<Allowance>(this.URL, allowance);
  }

  getAllAllowances(): Observable<Allowance[]> {
    return this.http.get<Allowance[]>(this.URL);
  }

  updateAllowance(id: string, allowance: Allowance): Observable<Allowance> {
    const updateUrl = `${this.URL}/${id}`;
    return this.http.put<Allowance>(updateUrl, allowance);
  }

  deleteAllowance(id: string): Observable<void> {
    const deleteUrl = `${this.URL}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

  
}
