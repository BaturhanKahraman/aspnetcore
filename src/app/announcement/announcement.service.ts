import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Announcement } from './announcement.model';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn:"root"})
export class AnnouncementService{
  path="http://localhost:56523/api/announcements/";
  ;
  constructor(private httpClient:HttpClient,private authService:AuthService) {
  }
  getAll(){
    return this.httpClient.get<Announcement[]>(this.path);
  }
  getAnnouncementById(annId:number):Observable<Announcement>{
    return this.httpClient.get<Announcement>(this.path+annId);
  }
  getAnnouncementsByStudentId(){
    return this.httpClient.get<Announcement[]>(this.path+ "GetAnnounceListByUserId/" + this.authService.getUserId());
  }
  getAnnouncementsByCourseId(courseId:number){
    return this.httpClient.get<Announcement[]>(this.path + "GetListByCourseId/"+ courseId);
  }
}
