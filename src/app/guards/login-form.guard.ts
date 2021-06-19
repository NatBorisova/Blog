import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isUserLoggedIn: boolean = false;
        this.userService.user.subscribe(value => {
            isUserLoggedIn = value.login ? false : true;
        });
        return isUserLoggedIn;
    }
}