import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "login-form-app",
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.less']
})

export class LoginFormComponent { 
}
