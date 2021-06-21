import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../services/user.service";
import { ISection } from "../sections-table/sections.service";

export interface IArticle {
    created: string;
    title: string;
    text: string;
    author: IUser;
    section: ISection;
    canComment: IUser[];
    canWatch: IUser[];
    isDisabled: boolean;
    comments: any;
    objectId: string;
}

@Injectable({ providedIn: "root" })
export class ArticlesService {

    constructor(private httpClient: HttpClient) { }

    getAllArticles() {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles?loadRelations=section,author`);
    }

    addArticle(article: string) {
        return this.httpClient.put('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles/deep-save', article);
    }

    deleteArticle(objectId: string) {
        return this.httpClient.delete(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles/${objectId}`);
    }

    changeStatus(objectId: string, isDisabled: boolean) {
        return this.httpClient.put(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles/${objectId}`, { "isDisabled": isDisabled });
    }
}
