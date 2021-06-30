import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, Subject } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "login-form-app",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.less"]
})

export class LoginFormComponent implements OnDestroy {

    email: string = "";
    password: string = "";
    errorText: string = "";
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

    loginUser(): void {
        this.authenticationService.login(this.email, this.password).pipe(
            mergeMap((user: any) => {
                const newUser = this.userService.createUser(user.login, user.email, new Date(user.lastLogin).toLocaleString("ru", { year: "2-digit", month: "2-digit", day: "2-digit", timeZone: "UTC", hour: "numeric", minute: "numeric", second: "numeric" }), user.userStatus, user.objectId);
                this.userService.user.next(newUser);
                localStorage.setItem("currentUser", JSON.stringify(newUser));
                localStorage.setItem("token", user["user-token"]);
                return forkJoin([this.userService.getUserRole(user["user-token"])]);
            }),
            takeUntil(this._onDestroy),
        ).subscribe((result) => {
            this.userService.isUserAdmin.next(Object.values(result[0]).includes("Admin"));
            this.router.navigate(["/"]);
        },
            (e) => {
                switch (e.error.code) {

                    case 3003:
                        this.errorText = "Неверный логин или пароль";
                        break;

                    case 3006:
                        this.errorText = "Введите логин и пароль";
                        break;

                    case 3090:
                        this.errorText = "Пользователь заблокирован администратором";
                        break;

                    default:
                        this.errorText = e.error.message;
                        break;
                }
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
