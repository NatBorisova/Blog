import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdministrationService } from "../services/administration.service";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "administration-form-app",
    templateUrl: './administration-form.component.html',
    styleUrls: ['./administration-form.component.less']
})

export class AdministrationFormComponent {

    tabName = "users";

    constructor(private router: Router, private userService: UserService, private administrationService: AdministrationService) {
    }

    changeTabName(tabName: string) {
        this.tabName = tabName;
    }
}
