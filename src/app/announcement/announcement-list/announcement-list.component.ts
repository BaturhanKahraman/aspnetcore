import { AnnouncementService } from './../announcement.service';
import { Announcement } from './../announcement.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css'],
})
export class AnnouncementListComponent implements OnInit {
  announcements: Announcement[];
  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.announcementService.getAnnouncementsByStudentId().subscribe(
      (data) => {
        this.announcements = data;
      },
      (error) => {
        console.log("error: ", error);
      }
    );
  }
}
