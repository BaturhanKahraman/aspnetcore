import { AuthService } from './../../auth/auth.service';
import { Link } from './link.model';
import { Component, OnInit } from '@angular/core';
const LINKS:Link[] =[
  {content:"Derslerim",routerLink:"/teacher/courses",role:'Teacher',icon:"auto_stories"},
  {content:"Profilim",routerLink:"/teacher/Profile",role:'Teacher',icon:"account_circle"},
  {content:"Kullanıcılar",routerLink:"/Admin/users",role:'Admin'},
  {content:"Departmanlar",routerLink:"/Admin/departments",role:'Admin'},
  {content:"Dersler",routerLink:"/Admin/courses",role:'Admin'},
  {content:"Dönemler",routerLink:"/Admin/courses",role:'Admin'},
  {content:"Profilim",routerLink:"/Admin/Profile",role:'Admin'},
];
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links:Link[];
  constructor(private authService:AuthService) {
    let role = this.authService.getRole();
    this.links = LINKS.filter(x=>x.role==role);
    console.log("Admin component : " + JSON.stringify(this.links))
   }
  ngOnInit(): void {
  }
}
