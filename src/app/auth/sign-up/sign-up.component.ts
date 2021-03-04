import { CustomValidator } from './../../shared/custom.validator';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errorText: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        surname: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email,
          CustomValidator.validateEmailDomain('ankara.edu.tr'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      },
      { validators: this.passwordValidator }
    );
  }
  onSubmit() {
    this.authService
      .signUp(
        this.signUpForm.value['name'],
        this.signUpForm.value['surname'],
        this.signUpForm.value['email'],
        this.signUpForm.value['password']
      )
      .subscribe(
        (data) => {
          console.log("data ::: " + data)
        },
        (error) => {
          this.errorText = error['error']['Errors'][1];
        }
      );
    this.authService.getUserId();
  }

  passwordValidator(form: FormGroup) {
    const condition = form.value.password !== form.value.confirmPassword;
    return condition ? { passwordsDoNotMatch: true } : null;
  }
}
