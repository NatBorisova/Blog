import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APPLICATION_ID, REST_API_KEY } from "./constants";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
    constructor(private httpClient: HttpClient) { }

    login(login: string, password: string): Observable<Object>  {
        return this.httpClient.post(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/users/login`, { "login": login, "password": password });
    }

    logout(token: string): Observable<Object>  {
        return this.httpClient.get(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/users/logout`, {
            headers: new HttpHeaders().set("user-token", token),
        });
    }
}
