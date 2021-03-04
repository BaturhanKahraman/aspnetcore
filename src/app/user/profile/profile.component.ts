import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { UserProfile } from './../user-profile.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile;
  passwordForm: FormGroup;
  errorText: string;
  successText: string;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserById();
    this.createPasswordForm();
  }

  createPasswordForm() {
    this.passwordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        reNewPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordValidator }
    );
  }

  getUserById() {
    this.userService.getUserById().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.userService
        .updatePassword(
          this.passwordForm.value['oldPassword'],
          this.passwordForm.value['newPassword'],
          this.passwordForm.value['reNewPassword']
        )
        .subscribe(
          (data) => {
            this.successText = data;
            console.log(data);
            this.passwordForm.reset();
          },
          (error) => {
            this.errorText=error["error"];
            this.passwordForm.reset();
          }
        );
    }
  }

  passwordValidator(form: FormGroup) {
    const condition = form.value.newPassword !== form.value.reNewPassword;
    return condition ? { passwordsDoNotMatch: true } : null;
  }
}
