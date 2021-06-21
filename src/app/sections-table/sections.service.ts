import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface ISection {
    name: string;
    isApproved: boolean;
    objectId: string;
}

@Injectable({ providedIn: "root" })
export class SectionService {

    constructor(private httpClient: HttpClient) { }

    createSection() {
        return {
            name: "",
            isApproved: false,
            objectId: ""
        }
    }

    getAllSections() {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/sections`);
    }

    approveSection(objectId: string) {
        return this.httpClient.put(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/sections/${objectId}`, { "isApproved": true });
    }

    addNewSection(name: string) {
        return this.httpClient.post('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/sections', `{"name":"${name}"}`);
    }
}
