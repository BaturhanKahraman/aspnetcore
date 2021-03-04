import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.css'],
})
export class NavbarStudentComponent implements OnInit {
  constructor(private authService:AuthService) {}

  ngOnInit(): void {}
  public collapsed = true;
  logOut() {
    this.authService.logOut();
  }
}
