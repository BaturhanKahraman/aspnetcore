import { CourseListTeacherComponent } from './course/course-list-teacher/course-list-teacher.component';
import { LoginGuard } from './auth/login.guard';
import { AuthGuard } from './auth/auth.guard';
import { AnnouncementDetailComponent } from './announcement/announcement-detail/announcement-detail.component';
import { UsersComponent } from './user/users/users.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CourseAnnouncementComponent } from './course/course-announcement/course-announcement.component';
import { CourseSelectComponent } from './course/course-select/course-select.component';
import { StudentComponent } from './layouts/student/student.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementListComponent } from './announcement/announcement-list/announcement-list.component';
import { RoleGuard } from './auth/role.guard';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //auth
  {
    path: '',
    component: AuthComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignUpComponent },
    ],
  },

  //student pages
  {
    path: '',
    component: StudentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: 'Student' },
    children: [
      { path: 'announcements', component: AnnouncementListComponent },
      { path: 'announcement/:id', component: AnnouncementDetailComponent },
      { path: 'course-selection', component: CourseSelectComponent },
      { path: 'course-announcement', component: CourseAnnouncementComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  //teacher pages
  {
    path: 'teacher',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: 'Teacher' },
    children: [
      { path: 'courses', component: CourseListTeacherComponent },
      { path: 'course/:id', component: CourseDetailComponent },
      { path: 'Profile', component: UsersComponent },
  ],
  },
  //admin pages
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: 'Admin' },
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'Profile', component: UsersComponent },
  ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
