import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IUser } from "./user.service";
import { IArticle } from "./articles.service";

export interface IComment {
    created: string;
    text: string;
    author: IUser;
    article: IArticle;
    isDisabled: boolean;
    objectId: string;
}

@Injectable({ providedIn: "root" })
export class CommentsService {

    constructor(private httpClient: HttpClient) { }

    getCommentsForArticle(articleObjectId: string) {
        return this.httpClient.get(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/comments?loadRelations=author%2Carticle&where=article.objectId%3D%27${articleObjectId}%27&sortBy=created`);
    }

    addComment(comment: string) {
        return this.httpClient.put('https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/comments/deep-save', comment);
    }

    deleteComment(objectId: string) {
        return this.httpClient.delete(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/comments/${objectId}`);
    }

    changeStatus(objectId: string, isDisabled: boolean) {
        return this.httpClient.put(`https://eu-api.backendless.com/ED2D3A22-02FB-DC2E-FF01-71AED8207D00/451F3C70-C9DA-49E9-9A4E-A934A5037580/data/comments/${objectId}`, { "isDisabled": isDisabled });
    }
}
