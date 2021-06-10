import { Injectable } from "@angular/core";

export interface IUser {
    login: string;
    email: string;
    password: string;
}

@Injectable({ providedIn: "root" })
export class UserService {

    public user: IUser = {
        login: "",
        email: "",
        password: "",
    };

    constructor() { }

}