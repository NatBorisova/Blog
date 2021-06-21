import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IUser {
    login: string;
    email: string;
    lastLogin: string;
    userStatus: string;
    objectId: string;
}

@Injectable()
export class UserService {
    public user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this.getCurrentUser());
    public isUserAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private httpClient: HttpClient) {
        let userToken = localStorage.getItem("token");
        if (userToken) {
            this.getUserRole(userToken).subscribe(
                (v) => {
                    this.isUserAdmin.next(Object.values(v).includes('Admin'));
                },
                e => console.log(e)
            );
        }
    }

    getCurrentUser(): IUser {
        let savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            return JSON.parse(savedUser);
        }
        return this.createUser();
    }

    createUser(login: string = "", email: string = "", lastLogin: string = "", userStatus: string = "", objectId: string = ""): IUser {
        return {
            login,
            email,
            lastLogin,
            userStatus: userStatus,
            objectId,
        }
    }

    getUser() {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/users/${this.user.value.objectId}`);
    }

    getAllUsers() {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/users`);
    }

    deleteUser(objectId: string) {
        return this.httpClient.delete(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/users/${objectId}`);
    }

    changeUserStatus(objectId: string, status: string) {
        return this.httpClient.put(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/024EF173-F6A1-4486-A86F-BFF7F4A7A72D/users/${objectId}/status`, { "userStatus": status });
    }

    getUserRole(token: string = "") {
        return this.httpClient.get('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/users/userroles', {
            headers: new HttpHeaders().set('user-token', token),
        });
    }
}
