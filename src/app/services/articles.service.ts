import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ISection, SectionService } from "./sections.service";
import { IUser, UserService } from "./user.service";

export interface IArticle {
    created: string;
    title: string;
    text: string;
    author: IUser;
    section: ISection;
    canComment: IUser[];
    canWatch: IUser[];
    isDisabled: boolean;
    objectId: string;
}

@Injectable({ providedIn: "root" })
export class ArticlesService {

    constructor(private httpClient: HttpClient, private userService: UserService, private sectionService: SectionService) { }

    createArticle(): IArticle {
        return {
            created: "",
            title: "",
            text: "",
            author: this.userService.createUser(),
            section: this.sectionService.createSection(),
            canComment: [],
            canWatch: [],
            isDisabled: false,
            objectId: "",
        }
    }

    getAllArticles(): Observable<Object> {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles?loadRelations=section,author,canComment`);
    }

    getAllAvailableArticles(userObjectId: string, authorObjectId: string = "", sectionObjectId: string = ""): Observable<Object> {
        let url = `https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles?loadRelations=section,author,canComment,canWatch&where=canWatch.objectId%3D%27${userObjectId}%27%20AND%20isDisabled%3Dfalse`;
        if (authorObjectId) {
            url = url + `%20AND%20author.objectId%3D%27${authorObjectId}%27`;
        }
        if (sectionObjectId) {
            url = url + `%20AND%20section.objectId%3D%27${sectionObjectId}%27`;
        }
        return this.httpClient.get(url);
    }

    addArticle(article: string): Observable<Object> {
        return this.httpClient.put("https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles/deep-save", article);
    }

    deleteArticle(objectId: string): Observable<Object> {
        return this.httpClient.delete(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles/${objectId}`);
    }

    changeStatus(objectId: string, isDisabled: boolean): Observable<Object> {
        return this.httpClient.put(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles/${objectId}`, { "isDisabled": isDisabled });
    }
}
