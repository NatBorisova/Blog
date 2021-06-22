import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../login-form/authentication.service";
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
    token: string | null = "";

    constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
        userService.user.subscribe(v => {
            this.isUserLoggedIn = v.login ? true : false;
            this.login = v.login;
        });
        userService.isUserAdmin.subscribe(v => this.isUserAdmin = v);
        this.token = localStorage.getItem("token");
    }

    logOut() {
        this.userService.isUserAdmin.next(false);
        if (!this.token) { return }
        this.authenticationService.logout(this.token).subscribe(
            () => {
                this.userService.user.next(this.userService.createUser());
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
