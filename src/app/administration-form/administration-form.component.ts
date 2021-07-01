import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: "administration-form-app",
    templateUrl: "./administration-form.component.html",
    styleUrls: ["./administration-form.component.less"]
})

export class AdministrationFormComponent {

    administrationForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.administrationForm = this.fb.group({
            tabName: "users"
        });
    }
}
