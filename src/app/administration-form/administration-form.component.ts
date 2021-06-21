import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
    selector: "administration-form-app",
    templateUrl: './administration-form.component.html',
    styleUrls: ['./administration-form.component.less']
})

export class AdministrationFormComponent {

    tabName = "users";

    constructor() { }

    changeTabName(tabName: string) {
        this.tabName = tabName;
    }
}
