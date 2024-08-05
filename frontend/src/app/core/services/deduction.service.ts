import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Deduction } from '../models/deduction';

@Injectable({
  providedIn: 'root',
})
export class DeductionService {
  private URL = 'http://localhost:3000/deductions';
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  constructor(private http: HttpClient) {}

  createDeduction(deduction: Deduction): Observable<Deduction> {
    return this.http.post<Deduction>(this.URL, deduction);
  }

  getAllDeductions(): Observable<Deduction[]> {
    return this.http.get<Deduction[]>(this.URL);
  }

  updateDeduction(id: string, deduction: Deduction): Observable<Deduction> {
    const updateUrl = `${this.URL}/${id}`;
    return this.http.put<Deduction>(updateUrl, deduction);
  }

  deleteDeduction(id: string): Observable<void> {
    const deleteUrl = `${this.URL}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }
}
