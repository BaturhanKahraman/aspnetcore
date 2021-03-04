import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css'],
})
export class LeftColumnComponent implements OnInit {
  constructor(private authService: AuthService) {}
  fullName: String;
  Email:String;
  ngOnInit(): void {
    this.fullName = this.authService.getUserNameSurname();
    this.Email=this.authService.getEmail();
  }
}
