import { AnnouncementService } from './../../../announcement/announcement.service';
import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/announcement/announcement.model';

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.css']
})
export class RightColumnComponent implements OnInit {

  constructor(private announcementService:AnnouncementService) { }
  lastAnnouncements:Announcement[]=[];
  ngOnInit(): void {
    this.announcementService.getAnnouncementsByStudentId().subscribe(data=>{this.lastAnnouncements=data});
  }

}
