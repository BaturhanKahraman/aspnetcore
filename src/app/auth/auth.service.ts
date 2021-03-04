import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}
  path = 'http://localhost:56523/api/auth/';
  jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;
  encodedToken: string;
  private tokenExpirationTimer: any;
  public user = new BehaviorSubject<User>(null);

  login(email: string, password: string) {
    return this.httpClient
      .post(this.path + 'login', {
        Email: email,
        Password: password,
      })
      .pipe(
        tap((data) => {
          //this.handleAuthentication();
          this.handleJwtToken(data['jwt']);
          this.handleAuthentication(
            this.getEmail(),
            this.getUserId(),
            this.getUserNameSurname(),
            this.encodedToken,
            this.getExpDate()
          );
        })
      );
  }
  autoLogin() {
    const userData: {
      email: string;
      id: number;
      fullName: string;
      _token: string;
      _tokenExpirationDate: any;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.fullName,
      userData._token,
      userData._tokenExpirationDate
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
      this.handleJwtToken(loadedUser.token);
    }
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  handleAuthentication(
    email: string,
    id: number,
    fullName: string,
    token: string,
    tokenExpirationDate: any
  ) {
    const user: User = new User(
      email,
      id,
      fullName,
      token,
      tokenExpirationDate
    );
    this.user.next(user);
    this.autoLogout(
      this.jwtHelper.getTokenExpirationDate(this.encodedToken).getTime() -
        new Date().getTime()
    );
    localStorage.setItem('userData', JSON.stringify(user));
  }

  signUp(name: string, surname: string, email: string, password: string) {
    return this.httpClient.post(
      this.path + 'register',
      {
        Name: name,
        Surname: surname,
        Email: email,
        Password: password,
      },
      { observe: 'response' }
    );
  }
  handleJwtToken(token) {
    //console.log(token);
    this.encodedToken = token;
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }
  getUserId(): number {
    return this.decodedToken.nameid;
  }

  getUserNameSurname(): string {
    return this.decodedToken.unique_name + ' ' + this.decodedToken.family_name;
  }
  getRole(): string {
    return this.decodedToken.role;
  }
  getEmail(): string {
    return this.decodedToken.email;
  }
  getExpDate() {
    return this.jwtHelper.getTokenExpirationDate(this.encodedToken);
  }
  logOut() {
    localStorage.removeItem('userData');
    this.user.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigateByUrl("/login");
  }
}
