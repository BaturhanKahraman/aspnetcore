import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AnnouncementListComponent } from './announcement/announcement-list/announcement-list.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { StudentComponent } from './layouts/student/student.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { NavbarStudentComponent } from './layouts/student/navbar-student/navbar-student.component';
import { LeftColumnComponent } from './layouts/student/left-column/left-column.component';
import { RightColumnComponent } from './layouts/student/right-column/right-column.component';
import { CourseSelectComponent } from './course/course-select/course-select.component';
import { CourseAnnouncementComponent } from './course/course-announcement/course-announcement.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UsersComponent } from './user/users/users.component';
import { AdminNavbarComponent } from './layouts/admin/admin-navbar/admin-navbar.component';
import { AnnouncementDetailComponent } from './announcement/announcement-detail/announcement-detail.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentDetailComponent } from './department/department-detail/department-detail.component';
import { registerLocaleData } from '@angular/common';
import { AdminSidenavComponent } from './layouts/admin/admin-sidenav/admin-sidenav.component';
import { CourseListTeacherComponent } from './course/course-list-teacher/course-list-teacher.component';
import { CourseDetailComponent } from './course/course-detail/course-detail.component';



import localeTr from '@angular/common/locales/tr';
import { AnnouncementsCourseComponent } from './course/course-detail/announcements-course/announcements-course.component';
import { CourseEditComponent } from './course/course-detail/course-edit/course-edit.component';
registerLocaleData(localeTr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    AnnouncementListComponent,
    AuthComponent,
    StudentComponent,
    AdminComponent,
    NavbarStudentComponent,
    LeftColumnComponent,
    RightColumnComponent,
    AnnouncementDetailComponent,
    CourseSelectComponent,
    CourseAnnouncementComponent,
    ProfileComponent,
    UsersComponent,
    AdminNavbarComponent,
    DepartmentListComponent,
    DepartmentDetailComponent,
    AdminSidenavComponent,
    CourseListTeacherComponent,
    CourseDetailComponent,
    AnnouncementsCourseComponent,
    CourseEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'tr_TR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
