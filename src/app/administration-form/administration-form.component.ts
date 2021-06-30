import { Component } from "@angular/core";

@Component({
    selector: "administration-form-app",
    templateUrl: "./administration-form.component.html",
    styleUrls: ["./administration-form.component.less"]
})

export class AdministrationFormComponent {

    tabName = "users";

    changeTabName(tabName: string): void {
        this.tabName = tabName;
    }
}
