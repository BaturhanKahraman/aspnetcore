import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          let role = this.authService.getRole();
          switch (role) {
            case 'Student':
              this.router.navigateByUrl('/announcements');
              return false;
            case 'Teacher':
              this.router.navigateByUrl('/teacher/courses');
              return false;
            case 'Admin':
              this.router.navigateByUrl('/admin/users');
              return false;
            default:
              return false;
          }
        }
        return true;
      })
    );
  }
}
