import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
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

    createArticle(created: string = "",
        title: string = "",
        text: string = "",
        author: IUser = this.userService.createUser(),
        section: ISection = this.sectionService.createSection(),
        canComment: IUser[] = [],
        canWatch: IUser[] = [],
        isDisabled: boolean = false,
        objectId: string = ""): IArticle {
        return {
            created,
            title,
            text,
            author: author ? author : this.userService.createUser(),
            section: section ? section : this.sectionService.createSection(),
            canComment,
            canWatch,
            isDisabled,
            objectId,
        };
    }

    getAllArticles(): Observable<Object> {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles?loadRelations=section,author,canComment`)
            .pipe(map((data: any) => {
                return data.map((article: any): IArticle => {
                    return this.createArticle(article.created, article.title, article.text,
                        article.author, article.section, article.canComment, article.canWatch,
                        article.isDisabled, article.objectId);
                });
            }));
    }

    getAllAvailableArticles(userLogin: string = "", authorLogin: string = "", sectionName: string = ""): Observable<Object> {
        let url = "";
        if (userLogin) {
            url = `https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles?loadRelations=section,author,canComment,canWatch&where=isDisabled%3Dfalse%20AND%20canWatch.login%3D%27${userLogin}%27`;
        } else {
            url = `https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/articles?loadRelations=section,author,canComment,canWatch&where=title%21%3D%27%27`;
        }
        if (authorLogin) {
            if (authorLogin === userLogin) {
                url = url.replace("isDisabled%3Dfalse%20AND%20", "");
            }
            url = url + `%20AND%20author.login%3D%27${authorLogin}%27`;
        }
        if (sectionName) {
            url = url + `%20AND%20section.name%3D%27${sectionName}%27`;
        }
        return this.httpClient.get(url)
            .pipe(map((data: any) => {
                return data.map((article: any): IArticle => {
                    return this.createArticle(article.created, article.title, article.text,
                        article.author, article.section, article.canComment, article.canWatch,
                        article.isDisabled, article.objectId);
                });
            }));;
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
