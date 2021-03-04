import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Department } from './../../department/department.model';
import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';
import { DepartmentService } from 'src/app/department/department.service';
import { type } from 'jquery';
import { Router } from '@angular/router';

// checkboxları array olarak almak ayarlanacak

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css'],
  providers: [CourseService],
})
export class CourseSelectComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}
  courses: Course[];
  departments: Department[];
  followedCoursesId: number[] = [];
  ngOnInit(): void {
    this.fillDepartments();
    this.getSubscribedCourseIds();
  }

  fillDepartments() {
    this.departmentService.getAll().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.log('department çekerken hata oluştu : ' + error);
      }
    );
  }
  getCourseList(courseId: number) {
    this.courseService.getByDepartmentId(courseId).subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.log('hata oluştu : ' + error);
      }
    );
  }
  //öğrencinin seçtiği derslerin idleri(seçili getirmek için)
  getSubscribedCourseIds() {
    this.courseService.getCourseListByStudentId().subscribe((data) => {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.followedCoursesId.push(element['id']);
      }
    });
  }
  changeOnCheckBox(event) {
    console.log('ilk değerler : ' + this.followedCoursesId);
    let courseId: number = +event.target.value;
    if (this.followedCoursesId.includes(courseId, 0)) {
      const index = this.followedCoursesId.indexOf(courseId, 0);
      this.followedCoursesId.splice(index, 1);
    } else {
      this.followedCoursesId.push(courseId);
    }
    console.log('son değer : ' + this.followedCoursesId);
  }
  onSubmit() {
    console.log(this.followedCoursesId);
    this.courseService
      .addCourseListForUser(this.followedCoursesId)
      .subscribe((data) => {
        console.log('Başarılı');
        this.router.navigateByUrl('/course-announcement');
      });
  }
}
