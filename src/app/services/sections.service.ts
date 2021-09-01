import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ISection } from "../interfaces/ISection";
import { APPLICATION_ID, REST_API_KEY } from "./constants";

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
        return this.httpClient.get(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/sections`)
            .pipe(map((data: any) => {
                return data.map((section: ISection): ISection => {
                    return this.createSection(section.name, section.isApproved, section.objectId);
                });
            }));
    }

    approveSection(objectId: string): Observable<Object> {
        return this.httpClient.put(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/sections/${objectId}`, { "isApproved": true });
    }

    addNewSection(name: string): Observable<Object> {
        return this.httpClient.post(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/sections`, `{"name":"${name}"}`);
    }
}
