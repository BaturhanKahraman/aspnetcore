import { Department } from './department.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DepartmentService {
  constructor(private http: HttpClient) {}
  path: string = 'http://localhost:56523/api/Departments';
  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.path);
  }
}
