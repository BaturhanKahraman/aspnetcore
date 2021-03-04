import { AnnouncementService } from './../announcement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from 'src/app/announcement/announcement.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css'],
})
export class AnnouncementDetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private announcementService: AnnouncementService
  ) {}
  ngOnInit(): void {
    this.getAnnouncement(this.router.snapshot.params['id']);
  }
  announcement:Announcement;

  getAnnouncement(annId: number) {
    this.announcementService.getAnnouncementById(annId).subscribe(
      (data) => {

        this.announcement = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
