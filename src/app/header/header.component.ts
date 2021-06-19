import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "header-app",
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnDestroy {

    isUserLoggedIn: boolean = false;
    isUserAdmin: boolean = false;
    login: string = "";
    token: string = "";

    constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
        userService.user.subscribe(v => {
            this.isUserAdmin = v.isUserAdmin;
            this.isUserLoggedIn = v.token ? true : false;
            this.login = v.login;
            this.token = v.token;
        });
    }

    logOut() {
        this.authenticationService.logout(this.token).subscribe(
            () => {
                this.userService.user.next(this.userService.emptyUser());
                localStorage.removeItem("currentUser");
                this.router.navigate(["/"]);
            },
            (error) => {
                console.log("error" + error)
            }
        );
    }

    ngOnDestroy() {
        this.userService.user.unsubscribe();
    }
}
