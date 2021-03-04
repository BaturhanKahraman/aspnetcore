import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from './user-profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  path: string = 'http://localhost:56523/api/users/';
  userId: number;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  getUserById(userId: number = this.userId): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.path + userId);
  }

  updatePassword(
    oldpassword: string,
    newPassword: string,
    reNewPassword: string
  ): Observable<any> {
    return this.http.post(this.path + 'EditPassword', {
      id: this.userId,
      oldPassword: oldpassword,
      newPassword: newPassword,
      reNewPassword: reNewPassword,
    },{responseType:"text"});
  }
}
