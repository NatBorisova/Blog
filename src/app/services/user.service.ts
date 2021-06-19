import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
    login: string;
    email: string;
    lastLogin: string;
    userStatus: string;
    objectId: string;
    token: string;
    isUserAdmin: boolean;
}

@Injectable()
export class UserService {
    public user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.getUser());

    getUser(): IUser {
        let savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            return JSON.parse(savedUser);
        }
        return this.emptyUser();
    }

    createUser(login: string, email: string, lastLogin: string, userStatus: string, objectId: string, token: string): IUser {
        return {
            login,
            email,
            lastLogin,
            userStatus: userStatus,
            objectId,
            token,
            isUserAdmin: false,
        }
    }

    emptyUser() {
        return {
            login: "",
            email: "",
            lastLogin: "",
            userStatus: "",
            objectId: "",
            token: "",
            isUserAdmin: false,
        }
    }

}
