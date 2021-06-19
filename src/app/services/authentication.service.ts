import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    constructor(private httpClient: HttpClient) { }

    login(login: string, password: string) {
        return this.httpClient.post('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/users/login', { "login": login, "password": password });
    }

    getUserRole(token: string) {
        return this.httpClient.get('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/users/userroles', {
            headers: new HttpHeaders().set('user-token', token),
        });
    }

    logout(token: string) {
        return this.httpClient.get('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/users/logout', {
            headers: new HttpHeaders().set('user-token', token),
        });
    }
}
