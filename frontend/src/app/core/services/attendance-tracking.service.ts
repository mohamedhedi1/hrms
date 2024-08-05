import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { AttendanceRecord, ShiftType } from '../models/attendanceRecord';

import {
  CreateAttendanceTrackingDto,
  Status,
} from '../models/Dto/CreateAttendanceTrackingDto';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AttendanceTrackingService {
  private URL = 'http://localhost:3000/attendance-tracking';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  private _listners = new Subject<any>();
   listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }

  constructor(private http: HttpClient) {}
  private _refreshNeeded$ = new Subject<void>();
  get refreshNeeded(): Observable<void> {
    return this._refreshNeeded$.asObservable();
  }

  create(
    id: string,
    createAttendanceTrackingDto: CreateAttendanceTrackingDto
  ): Observable<any> {
    return this.http
      .post<any>(
        `${this.URL}/${id}`,
        createAttendanceTrackingDto,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._refreshNeeded$.next(); // Emit refresh event after creating a new attendance record
        })
      );
  }

  findAll(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(this.URL, this.httpOptions);
  }

  findOne(id: string): Observable<AttendanceRecord | string> {
    return this.http.get<AttendanceRecord | string>(
      `${this.URL}/${id}`,
      this.httpOptions
    );
  }

  update(
    id: string,
    updateAttendanceTrackingDto: CreateAttendanceTrackingDto
  ): Observable<any> {
    return this.http
      .put(
        `${this.URL}/updateAttendance/${id}`,
        updateAttendanceTrackingDto,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._refreshNeeded$.next(); // Emit refresh event after creating a new attendance record
        })
      );
  }
  updateUserAndAttendance(
    userId: string,
    updateUserDto: User
  ): Observable<User> {
    const url = `${this.URL}/updateUser/${userId}`;
    return this.http.put<User>(url, updateUserDto).pipe(
      tap(() => {
        this._refreshNeeded$.next(); // Emit refresh event after creating a new attendance record
      })
    );
  }

  remove(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.URL}/${id}`, this.httpOptions);
  }

  find(id: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/getUser/${id}`, this.httpOptions);
  }
  updateAttendanceRecord(
    id: string,
    updateDto: CreateAttendanceTrackingDto
  ): Observable<AttendanceRecord> {
    const url = `${this.URL}/${id}`;
    return this.http
      .put<AttendanceRecord>(url, updateDto, this.httpOptions)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next(); // Emit refresh event after creating a new attendance record
        })
      );
  }
  findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/users`, this.httpOptions).pipe(
      tap((data: User[]) => console.log('Response from findAllUsers():', data)),
      catchError((error) => {
        console.error('Error in findAllUsers():', error);
        throw error;
      })
    );
  }
  findAllUsersWithAttendance(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/with-attendance`);
  }
  getAttendanceByUserIdAndDate(
    id: string,
    date: string
  ): Observable<AttendanceRecord | null> {
    const url = `${this.URL}/${id}?date=${date}`;
    return this.http.get<AttendanceRecord | null>(url);
  }
  getUserIdByEmail(email: string): Observable<any> {
    const url = `${this.URL}/getUserByEmail/${email}`;
    return this.http.get<any>(url);
  }
  createAttendance(
    userId: string,
    createAttendanceTrackingDto: CreateAttendanceTrackingDto
  ): Observable<any> {
    return this.http
      .post<any>(
        `${this.URL}/create/${userId}`,
        createAttendanceTrackingDto,
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
  getTotalHalfShiftDaysForUserInMonth(
    userId: string,
    month: number
  ): Observable<any> {
    // Construct query parameters
    const params = new HttpParams().set('month', month.toString());

    // Make GET request with query parameters
    return this.http.get<any>(`${this.URL}/total-half-shift-days/${userId}`, {
      params,
    });
  }
}
