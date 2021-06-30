import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IUser } from "../interfaces/IUser";
import { UserService } from "../services/user.service";

@Component({
    selector: "user-table-app",
    templateUrl: "./user-table.component.html",
    styleUrls: ["./user-table.component.less"]
})

export class UserTableComponent implements OnInit, OnDestroy {

    users: IUser[] = [];
    currentUserObjectId: string = "";
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.userService.user.subscribe((v: IUser) => this.currentUserObjectId = v.objectId);
        this.updateUsers();
    }

    deleteUser(objectId: string): void {
        this.userService.deleteUser(objectId)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => { this.updateUsers(); },
            );
    }

    updateUsers(): void {
        this.userService.getAllUsers()
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: IUser[]) => { this.users = v; });
    }

    changeUserStatus(objectId: string, status: string): void {
        this.userService.changeUserStatus(objectId, status === "DISABLED" ? "ENABLED" : "DISABLED")
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => { this.updateUsers(); },
            );
    }

    getUsersEmails(): string {
        return this.users.map(e => e.email).toString();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
