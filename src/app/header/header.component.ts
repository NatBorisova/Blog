import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IUser } from "../interfaces/IUser";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "header-app",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.less"]
})

export class HeaderComponent implements OnInit, OnDestroy {

    isUserLoggedIn: boolean = false;
    isUserAdmin: boolean = false;
    login: string = "";
    user: IUser;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
        this.user = userService.createUser();
    }

    ngOnInit(): void {
        this.userService.user
            .pipe(takeUntil(this._onDestroy))
            .subscribe(v => {
                this.isUserLoggedIn = v.login ? true : false;
                this.login = v.login;
                this.user = v;
            });
        this.userService.isUserAdmin
            .pipe(takeUntil(this._onDestroy))
            .subscribe(v => this.isUserAdmin = v);
    }

    logOut(): void {
        const token = localStorage.getItem("token");
        if (!token) { return; }
        this.authenticationService.logout(token)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => {
                    this.userService.user.next(this.userService.createUser());
                    this.userService.isUserAdmin.next(false);
                    localStorage.removeItem("currentUser");
                    localStorage.removeItem("token");
                    this.router.navigate(["/"]);
                },
                (error) => {
                    console.log("error" + error);
                },
            );
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
