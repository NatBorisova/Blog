import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../user";

@Injectable({ providedIn: "root" })
export class RegistrationService {
    constructor(private httpClient: HttpClient) { }

    register(user: IUser) {
        return this.httpClient.post('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/services/UserService/User', JSON.stringify(user));
    }
}
