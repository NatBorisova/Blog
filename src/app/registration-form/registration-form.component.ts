import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { RegistrationService } from "../services/registration.service";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
    selector: "registration-form-app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.less']
})

export class RegistrationFormComponent implements OnDestroy {

    login: string = "";
    email: string = "";
    password: string = "";
    error: string = "";
    isUserAdmin: boolean = false;

    constructor(private registrationService: RegistrationService, private router: Router, private userService: UserService) {
        this.userService.user.subscribe(value => {
            this.isUserAdmin = value.isUserAdmin;
        });
    }
    registerUser() {
        this.registrationService.register(this.login, this.email, this.password).subscribe(
            (registeredUser: any) => {
                this.registrationService.changeUserStatus(registeredUser.objectId, this.isUserAdmin ? "ENABLED" : "DISABLED").subscribe();
                if (this.isUserAdmin) {
                    this.router.navigate(["/administration"]);
                } else {
                    this.router.navigate(["/login"]);
                }
            },
            (e) => {
                // if (e.error.code === 3033) {
                //     this.error = "Пользователь с таким e-mail уже существует";
                //     console.log(this.error);
                // }
                console.log(e);
            }
        );
    }

    ngOnDestroy() {
        // this.userService.user.unsubscribe();
    }
}
