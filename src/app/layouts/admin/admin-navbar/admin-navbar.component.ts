import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Link } from '../link.model';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  @Input() links:Link[];
  constructor(private authService:AuthService) {}

  ngOnInit(): void {}

  onToggle() {
    this.toggle.emit();
  }
  logOut(){
    this.authService.logOut();
  }
}
