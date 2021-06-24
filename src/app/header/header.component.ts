import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "header-app",
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit, OnDestroy {

    isUserLoggedIn: boolean = false;
    isUserAdmin: boolean = false;
    login: string = "";
    user: IUser;

    constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
        this.user = userService.createUser();
    }
    ngOnInit() {
        this.userService.user.subscribe(v => {
            this.isUserLoggedIn = v.login ? true : false;
            this.login = v.login;
            this.user = v;
        });
        this.userService.isUserAdmin.subscribe(v => this.isUserAdmin = v);
    }
    logOut() {
        let token = localStorage.getItem("token");
        if (!token) { return }
        this.authenticationService.logout(token).subscribe(
            () => {
                this.userService.user.next(this.userService.createUser());
                this.userService.isUserAdmin.next(false);
                localStorage.removeItem("currentUser");
                localStorage.removeItem("token");
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
