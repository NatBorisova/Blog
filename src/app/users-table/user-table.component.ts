import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AdministrationService } from "../services/administration.service";
import { RegistrationService } from "../services/registration.service";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "user-table-app",
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.less']
})

export class UserTableComponent {

    users: IUser[] = [];
    tabName = "users";

    constructor(private router: Router, private userService: UserService, private administrationService: AdministrationService, private registrationService: RegistrationService) {
        this.administrationService.getAllUsers().subscribe((v: any) => { this.users = v });
    }

    deleteUser(objectId: string): void {
        this.administrationService.deleteUser(objectId).subscribe(
            () => { this.administrationService.getAllUsers().subscribe((v: any) => { this.users = v }) }
        );
    }

    selectAllUsers(): void {

    }

    changeUserStatus(objectId: string, status: string): void {
        this.registrationService.changeUserStatus(objectId, status === "DISABLED" ? "ENABLED" : "DISABLED").subscribe(
            () => { this.administrationService.getAllUsers().subscribe((v: any) => { this.users = v }) }
        );
    }
}
