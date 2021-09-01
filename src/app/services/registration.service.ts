import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { APPLICATION_ID, REST_API_KEY } from "./constants";

@Injectable({ providedIn: "root" })
export class RegistrationService {

    constructor(private httpClient: HttpClient) { }

    register(login: string, email: string, password: string): Observable<Object> {
        const body = `{"login":"${login}", "email":"${email}", "password":"${password}"}`;
        return this.httpClient.post(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/users/register`, body);
    }
}
