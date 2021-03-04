import { AuthService } from './../../../auth/auth.service';
import { Link } from './../link.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  @Input() links : Link[]=[];
  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {

  }
  onClose(){
    this.closeSideNav.emit();
  }

  logOut(){
    this.authService.logOut();
  }
}
