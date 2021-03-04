import { map, tap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from './course.model';

@Injectable()
export class CourseService {
  path = 'http://localhost:56523/api/courses/';
  userId:number;
  constructor(private http: HttpClient, private authService: AuthService) {
   this.userId = this.authService.getUserId();
  }
  getAll() {
    return this.http.get<Course[]>(this.path);
  }

  getById(courseId:number){
    return this.http.get<Course>(this.path+courseId);
  }

  getByDepartmentId(courseId: number): Observable<Course[]> {
    return this.http.get<Course[]>(this.path + 'byDepartment/' + courseId);
  }

  getCourseListByStudentId():Observable<Course[]>{
    return this.http.get<Course[]>(this.path+'byStudent/' + this.userId);
  }

  addCourseListForUser(coursesIds:number[]){
    return this.http.post("http://localhost:56523/api/CourseStudents/AddCourseListForUser" ,{
      UserId:this.userId,
      CourseId:coursesIds
    });
  }

  getCourseListByTeacherId():Observable<Course[]>{
    return this.http.get<Course[]>(this.path+"byTeacher/"+this.userId);
  }
}
