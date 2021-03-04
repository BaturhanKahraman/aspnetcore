import { AuthService } from './../../../auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from './../../course.service';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../course.model';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css'],
  providers:[CourseService]
})
export class CourseEditComponent implements OnInit {
  @Input() courseId: number;
  course: Course;
  editForm : FormGroup;
  constructor(private courseService: CourseService,private authService:AuthService) {}

  ngOnInit(): void {
    this.getCourse();
    this.editForm= new FormGroup({
      name : new FormControl(this.course.name,[Validators.required]),
      code : new FormControl(this.course.code,[Validators.required])
    });
  }

  getCourse() {
    this.courseService.getById(this.courseId).subscribe(
      (data) => {
        this.course = data;
        console.log(JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isAdmin():boolean{
    return this.authService.getRole().toLowerCase()=="admin";
  }
}
