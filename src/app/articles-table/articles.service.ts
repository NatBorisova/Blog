import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser, UserService } from "../services/user.service";
import { ISection, SectionService } from "../sections-table/sections.service";

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
            objectId: ""
        }
    }

    getAllArticles() {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles?loadRelations=section,author,canComment`);
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
