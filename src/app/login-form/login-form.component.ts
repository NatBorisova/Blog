import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "login-form-app",
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.less']
})

export class LoginFormComponent {

    email: string = "";
    password: string = ""

    constructor(private authenticationService: AuthenticationService, private userService: UserService, private router: Router) { }

    loginUser() {
        this.authenticationService.login(this.email, this.password).subscribe(
            (user: any) => {
                let newUser = this.userService.createUser(user.login, user.email, new Date(user.lastLogin).toLocaleString("ru", { year: '2-digit', month: '2-digit', day: '2-digit', timeZone: 'UTC', hour: 'numeric', minute: 'numeric', second: 'numeric' }), user.userStatus, user.objectId);
                this.userService.user.next(newUser);
                localStorage.setItem("currentUser", JSON.stringify(newUser));
                localStorage.setItem("token", user["user-token"]);

                this.userService.getUserRole(user["user-token"]).subscribe(
                    (v) => {
                        this.userService.isUserAdmin.next(Object.values(v).includes('Admin'));
                    },
                    e => console.log(e)
                );
                this.router.navigate(["/"]);
            },
            (error) => {
                console.log(error)
            }
        );
    }
}
