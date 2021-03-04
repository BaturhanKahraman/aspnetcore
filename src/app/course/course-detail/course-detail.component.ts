import { CourseService } from './../course.service';
import { Course } from './../course.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  providers: [CourseService],
})
export class CourseDetailComponent implements OnInit {
  courseId: number;
  course: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params['id'];
    this.getCourse();
  }

  getCourse() {
    this.courseService.getById(this.courseId).subscribe((data) => {
      this.course = data;
    });
  }



}
