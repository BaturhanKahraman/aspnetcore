import { AnnouncementService } from './../../announcement/announcement.service';
import { Announcement } from './../../announcement/announcement.model';
import { CourseService } from './../course.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course-announcement',
  templateUrl: './course-announcement.component.html',
  styleUrls: ['./course-announcement.component.css'],
  providers: [CourseService],
})
export class CourseAnnouncementComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private announcementService: AnnouncementService
  ) {}
  courses: Course[] = [];
  announcements: Announcement[];
  ngOnInit(): void {
    this.getSubscribedCourses();
  }

  getSubscribedCourses() {
    this.courseService.getCourseListByStudentId().subscribe((data) => {
      this.courses = data;
    });
  }

  getAnnouncementsByCourse(courseId: number) {
    this.announcementService.getAnnouncementsByCourseId(courseId).subscribe(
      (data) => {
        this.announcements = data;
      },
      (error) => {
        console.log(
          'An Error occured while fetching announcements : ' +
            JSON.stringify(error)
        );
      }
    );
  }
}
