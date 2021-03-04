import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/custom.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  errorText: string;
  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        CustomValidator.validateEmailDomain('ankara.edu.tr'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.authService
      .login(this.loginForm.value['email'], this.loginForm.value['password'])
      .subscribe(
        (data) => {
          //console.log("data[jwt] ::: "+ data['jwt']); //jwt
          this.routeByRole();
        },
        (error) => {
          console.log('hataya girdi : ' + JSON.stringify(error));
          this.errorText = error['error']['message'];
        }
      );
  }

  routeByRole() {
    let role = this.authService.getRole();
    switch (role) {
      case 'Student':
        this.router.navigateByUrl('/announcements');
        break;
      case 'Teacher':
        this.router.navigateByUrl('/teacher/courses');
        break;
      case 'Admin':
        this.router.navigateByUrl('/admin/users');
        break;
      default:
        break;
    }
  }
}
