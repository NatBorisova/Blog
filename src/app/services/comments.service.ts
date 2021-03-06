import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IArticle } from "../interfaces/IArticle";
import { IComment } from "../interfaces/IComment";
import { IUser } from "../interfaces/IUser";
import { ArticlesService } from "./articles.service";
import { UserService } from "./user.service";
import { APPLICATION_ID, REST_API_KEY } from "./constants";

@Injectable({ providedIn: "root" })
export class CommentsService {

    constructor(private httpClient: HttpClient, private userService: UserService, private articlesService: ArticlesService) { }

    createComment(created: string = "",
        text: string = "",
        author: IUser = this.userService.createUser(),
        article: IArticle = this.articlesService.createArticle(),
        isDisabled: boolean = false,
        objectId: string = ""): IComment {
        return {
            created,
            text,
            author: author ? author : this.userService.createUser(),
            article,
            isDisabled,
            objectId
        };
    }

    getCommentsForArticle(articleObjectId: string): Observable<IComment[]> {
        return this.httpClient.get(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/comments?loadRelations=author%2Carticle&where=article.objectId%3D%27${articleObjectId}%27&sortBy=created`)
            .pipe(map((data: any) => {
                return data.map((comment: IComment): IComment => {
                    return this.createComment(comment.created, comment.text, comment.author,
                        comment.article, comment.isDisabled, comment.objectId);
                });
            }));
    }

    addComment(comment: string): Observable<Object> {
        return this.httpClient.put(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/comments/deep-save`, comment);
    }

    deleteComment(objectId: string): Observable<Object> {
        return this.httpClient.delete(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/comments/${objectId}`);
    }

    changeStatus(objectId: string, isDisabled: boolean): Observable<Object> {
        return this.httpClient.put(`https://eu-api.backendless.com/${APPLICATION_ID}/${REST_API_KEY}/data/comments/${objectId}`, { "isDisabled": isDisabled });
    }
}
