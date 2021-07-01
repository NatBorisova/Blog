import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

    isUserAdmin: boolean = false;
    errorText: string = "";
    registrationForm: FormGroup;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private fb: FormBuilder, private registrationService: RegistrationService, private router: Router, private userService: UserService) {
        this.registrationForm = this.fb.group({});
    }

    ngOnInit(): void {
        this.userService.isUserAdmin
            .pipe(takeUntil(this._onDestroy))
            .subscribe(v => this.isUserAdmin = v);
        this.registrationForm = this.fb.group({
            login: ["", [Validators.required, Validators.maxLength(20)]],
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.pattern(/(?=.*[0-9])(?=.*[a-zA-Z]).{8,}/)]],
        });
    }

    registerUser(): void {
        this.registrationService.register(this.registrationForm.get("login")?.value,
            this.registrationForm.get("email")?.value, this.registrationForm.get("password")?.value).pipe(
                mergeMap((registeredUser: any) => {
                    return forkJoin([this.userService.changeUserStatus(registeredUser.objectId, this.isUserAdmin ? "ENABLED" : "DISABLED")]);
                }),
                takeUntil(this._onDestroy),
            ).subscribe(() => {
                if (this.isUserAdmin) {
                    this.router.navigate(["/administration"]);
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
