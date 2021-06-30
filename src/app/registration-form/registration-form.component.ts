import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, Subject } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";
import { RegistrationService } from "../services/registration.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "registration-form-app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./registration-form.component.html",
    styleUrls: ["./registration-form.component.less"]
})

export class RegistrationFormComponent implements OnInit, OnDestroy {

    login: string = "";
    email: string = "";
    password: string = "";
    isUserAdmin: boolean = false;
    errorText: string = "";
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private registrationService: RegistrationService, private router: Router, private userService: UserService) { }

    ngOnInit(): void {
        this.userService.isUserAdmin
            .pipe(takeUntil(this._onDestroy))
            .subscribe(v => this.isUserAdmin = v);
    }

    registerUser(): void {
        this.registrationService.register(this.login, this.email, this.password).pipe(
            mergeMap((registeredUser: any) => {
                return forkJoin([this.userService.changeUserStatus(registeredUser.objectId, this.isUserAdmin ? "ENABLED" : "DISABLED")]);
            }),
            takeUntil(this._onDestroy),
        ).subscribe(() => {
            if (this.isUserAdmin) {
                this.router.navigate(["/administration"]);
                console.log(this.isUserAdmin);

            } else {
                this.router.navigate(["/login"]);
            }
        },
            (e) => {
                switch (e.error.code) {
                    case 3033:
                        this.errorText = "Пользователь с таким e-mail уже существует";
                        console.log(this.errorText);
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
