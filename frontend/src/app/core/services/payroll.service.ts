import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payroll } from '../models/payroll';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  URL = 'http://localhost:3000/payrolls';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createPayroll(payroll: Payroll) {
    return this.http.post<Payroll>(this.URL, payroll, this.httpOptions);
  }

  getAllPayrolls() {
    return this.http.get<Payroll[]>(this.URL, this.httpOptions);
  }

  getPayrollsByMonth(month: string) {
    return this.http.get<Payroll[]>(
      `${this.URL}/month/${month}`,
      this.httpOptions
    );
  }

  getPayrollsByUserId(userId: string) {
    return this.http.get<Payroll[]>(
      `${this.URL}/user/${userId}`,
      this.httpOptions
    );
  }

  getUserIdByEmail(email: string) {
    return this.http.get<User>(
      `${this.URL}/getUserByEmail/${email}`,
      this.httpOptions
    );
  }

  getAllUsers() {
    return this.http.get<User[]>(
      `${this.URL}/getAllUsers`,
      this.httpOptions
    );
  }
}
