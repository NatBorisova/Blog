import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IUser } from "../services/user";
import { RegistrationService } from "../services/api-services/registration.service";

@Component({
    selector: "registration-form-app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.less']
})

export class RegistrationFormComponent {


    user: IUser = {
        login: "",
        email: "",
        password: ""
    }

    constructor(private registrationService: RegistrationService) { }

    registerUser() {
        this.registrationService.register(this.user).subscribe(
            user => console.log(user),
            error => console.log(error)
        );
    }
}
