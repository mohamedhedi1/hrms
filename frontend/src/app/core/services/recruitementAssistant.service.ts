import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecruitementAssistantService {
  constructor(private http: HttpClient) {}
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded(): Observable<void> {
    return this._refreshNeeded$.asObservable();
  }

  sendMessage(message: string): Observable<any> {
    return this.http
      .post<any>('http://127.0.0.1:5000/predict', { message })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next(); // Emit refresh event after creating a new attendance record
        })
      );
  }
  /*sendMessage(message: string): Observable<any> {
    return this.http
      .post<any>('http://127.0.0.1:5000/predict', { message })
      .pipe(
        tap((response) => {
          //console.log('Response from server:', response); // Log response
          this._refreshNeeded$.next(); // Emit refresh event after creating a new attendance record
        }),
        catchError((error) => {
          console.error('Error in sendMessage:', error); // Log error
          throw error; // Rethrow the error
        })
      );
  }*/
}
