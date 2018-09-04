import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot, CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";

import { UserService } from "./shared/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (UserService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
