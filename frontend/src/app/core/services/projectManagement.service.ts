import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementService {
  private URL = 'http://localhost:3000/project-management'; // Define your API URL in environment.ts

  constructor(private http: HttpClient) {}

  createProject(createProjectDto: Project): Observable<any> {
    return this.http.post<any>(`${this.URL}`, createProjectDto);
  }

  getAllProjects(): Observable<any> {
    return this.http.get<any>(`${this.URL}`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.URL}${id}`);
  }

  updateProject(id: string, updateProjectDto: Project): Observable<any> {
    return this.http.put<any>(`${this.URL}/${id}`, updateProjectDto);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}/${id}`);
  }
}
