import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ISection } from "../interfaces/ISection";

@Injectable({ providedIn: "root" })
export class SectionService {

    constructor(private httpClient: HttpClient) { }

    createSection(name: string = "", isApproved: boolean = false, objectId: string = ""): ISection {
        return {
            name,
            isApproved,
            objectId
        };
    }

    getAllSections(): Observable<ISection[]> {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/sections`)
            .pipe(map((data: any) => {
                return data.map((section: ISection): ISection => {
                    return this.createSection(section.name, section.isApproved, section.objectId);
                });
            }));
    }

    approveSection(objectId: string): Observable<Object> {
        return this.httpClient.put(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/sections/${objectId}`, { "isApproved": true });
    }

    addNewSection(name: string): Observable<Object> {
        return this.httpClient.post("https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/sections", `{"name":"${name}"}`);
    }
}
