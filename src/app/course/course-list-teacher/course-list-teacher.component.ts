import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-list-teacher',
  templateUrl: './course-list-teacher.component.html',
  styleUrls: ['./course-list-teacher.component.css'],
  providers:[CourseService]
})
export class CourseListTeacherComponent implements OnInit {
  courses: Course[] = [];
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourseListByTeacherId().subscribe(
      (data) => {
        this.courses = data;
        console.log(this.courses);
      },
      (error) => {
        console.log('Course-list-teacher fetcing data error ' + error);
      }
    );
  }
}
