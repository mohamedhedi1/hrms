import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Department } from '../models/Department';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private URL = "http://localhost:3000/department-management"; // Update the URL to use "department" instead of "foyer"
  private httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  getAll():Observable<Department[]> { // Change method name
    return this.http.get<Department[]>(this.URL, this.httpOtions);
  }

  addDepartment( 
    createdepartmentdto: Department): Observable<Department> {
      return this.http.post<Department>(
        this.URL,
        createdepartmentdto,
        this.httpOtions
      );
  }

  getDepartmentById(id: String):Observable<Department | string >  { // Change method name
    return this.http.get<Department | string>(`${this.URL}/${id}`,this.httpOtions).pipe(
      catchError(error => {
        console.error('Error fetching Department by ID:', error);
        return throwError(error);
      })
    );
  }



  updateDepartment(    id: string,
    updateDepartmentDto:Department
    ) : Observable<any> {
    return this.http.put(
      `${this.URL}/${id}`,
      updateDepartmentDto,
      this.httpOtions
    );
  }

  deleteDepartment(id: string):Observable<boolean> { 
    return this.http.delete<boolean>(`${this.URL}/${id}`, this.httpOtions);
  }

  
}
