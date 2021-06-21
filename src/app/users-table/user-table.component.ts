import { Component } from "@angular/core";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "user-table-app",
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.less']
})

export class UserTableComponent {

    users: IUser[] = [];

    constructor(private userService: UserService) {
        this.updateUsers();
    }

    deleteUser(objectId: string): void {
        this.userService.deleteUser(objectId).subscribe(
            () => { this.updateUsers() }
        );
    }

    updateUsers() {
        this.userService.getAllUsers().subscribe((v: any) => { this.users = v });
    }

    changeUserStatus(objectId: string, status: string): void {
        this.userService.changeUserStatus(objectId, status === "DISABLED" ? "ENABLED" : "DISABLED").subscribe(
            () => { this.updateUsers() }
        );
    }
}
