import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable()
export class AdministrationGuard implements CanActivate {

    constructor(private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let isUserAdmin: boolean = false;
        this.userService.user.subscribe(value => {
            isUserAdmin = value.isUserAdmin;
        });
        
        return isUserAdmin;
    }
}