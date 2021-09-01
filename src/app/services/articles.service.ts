import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IArticle } from "../interfaces/IArticle";
import { INewArticle } from "../interfaces/INewArticle";
import { ISection } from "../interfaces/ISection";
import { IUser } from "../interfaces/IUser";
import { SectionService } from "./sections.service";
import { UserService } from "./user.service";
import { APPLICATION_ID, REST_API_KEY } from "./constants";

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

    createNewArticle(): INewArticle {
        return {
            title: "",
            text: "",
            author: this.userService.createUser(),
            section: this.sectionService.createSection(),
            canComment: [],
            canWatch: [],
            isDisabled: false
        };
    }

    getAllArticles(authorLogin: string = "", sectionName: string = ""): Observable<IArticle[]> {
        return this.httpClient.get(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/articles?loadRelations=section,author,canComment&where=title%21%3D%27%27${authorLogin ? `%20AND%20author.login%3D%27${authorLogin}%27` : ""}${sectionName ? `%20AND%20section.name%3D%27${sectionName}%27` : ""}&sortBy=created`)
            .pipe(map((data: any) => {
                return data.map((article: IArticle): IArticle => {
                    return this.createArticle(article.created, article.title, article.text,
                        article.author, article.section, article.canComment, article.canWatch,
                        article.isDisabled, article.objectId);
                });
            }));
    }

    getAllAvailableArticles(userLogin: string, authorLogin: string = "", sectionName: string = ""): Observable<IArticle[]> {
        let url = `https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/articles?loadRelations=section,author,canComment,canWatch&where=isDisabled%3Dfalse%20AND%20canWatch.login%3D%27${userLogin}%27`;
        if (authorLogin) {
            if (authorLogin === userLogin) {
                url = url.replace("isDisabled%3Dfalse%20AND%20", "");
            }
            url = url + `%20AND%20author.login%3D%27${authorLogin}%27`;
        }
        if (sectionName) {
            url = url + `%20AND%20section.name%3D%27${sectionName}%27`;
        }
        url = url + "&sortBy=created";
        return this.httpClient.get(url)
            .pipe(map((data: any) => {
                return data.map((article: IArticle): IArticle => {
                    return this.createArticle(article.created, article.title, article.text,
                        article.author, article.section, article.canComment, article.canWatch,
                        article.isDisabled, article.objectId);
                });
            }));
    }

    addArticle(article: string): Observable<Object> {
        return this.httpClient.put(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/articles/deep-save`, article);
    }

    deleteArticle(objectId: string): Observable<Object> {
        return this.httpClient.delete(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/articles/${objectId}`);
    }

    changeStatus(objectId: string, isDisabled: boolean): Observable<Object> {
        return this.httpClient.put(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/articles/${objectId}`, { "isDisabled": isDisabled });
    }
}
