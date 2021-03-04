import { AnnouncementService } from './../../../announcement/announcement.service';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Announcement } from 'src/app/announcement/announcement.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-announcements-course',
  templateUrl: './announcements-course.component.html',
  styleUrls: ['./announcements-course.component.css']
})
export class AnnouncementsCourseComponent implements OnInit,AfterViewInit {
  @Input() courseId:number;
  displayedColumns = ['id', 'title', 'addedAt', 'updatedAt', 'isActive'];
  dataSource = new MatTableDataSource<Announcement>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private announcementService:AnnouncementService) { }

  ngOnInit(): void {
    this.getAnnouncements()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  filterDataTable(filter:string){
    this.dataSource.filter=filter.trim().toLocaleLowerCase();
  }

  getAnnouncements() {
    this.announcementService
      .getAnnouncementsByCourseId(this.courseId)
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }
}
