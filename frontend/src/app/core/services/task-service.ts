import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Task } from '../models/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private URL = 'http://localhost:3000/tasks'; // Update the URL
  private httpOtions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    // Change method name
    return this.http.get<Task[]>(this.URL, this.httpOtions);
  }
  addTask(createtaskdto: Task): Observable<Task> {
    return this.http.post<Task>(this.URL, createtaskdto, this.httpOtions);
  }

  getTaskById(id: String): Observable<Task | string> {
    // Change method name
    return this.http
      .get<Task | string>(`${this.URL}/${id}`, this.httpOtions)
      .pipe(
        catchError((error) => {
          console.error('Error fetching holiday by ID:', error);
          return throwError(error);
        })
      );
  }

  updateTask(taskId: string, updateTaskDto: Task): Observable<any> {
    return this.http.put(`${this.URL}/${taskId}`, updateTaskDto, this.httpOtions);
  }

  deleteTask(taskId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.URL}/${taskId}`, this.httpOtions);
  }
}
