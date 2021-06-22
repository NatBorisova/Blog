import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticlesService, IArticle } from "../articles-table/articles.service";
import { SectionService } from "../sections-table/sections.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "article-app",
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})

export class ArticleComponent {

    article: IArticle;
    isUserAdmin: boolean = false;
    canUserComment: boolean = false;

    constructor(private route: ActivatedRoute, private articlesService: ArticlesService, private sectionService: SectionService, private userService: UserService) {
        this.article = articlesService.createArticle();
        route.queryParams.subscribe(
            (queryParam: any) => {
                this.article = JSON.parse(queryParam.article);
            }
        );
        userService.user.subscribe((v: any) => {
            if (this.article.canComment) {
                let user = this.article.canComment.find(user => user.objectId === v.objectId);
                if (user) {
                    this.canUserComment = true;
                }
            }
        });
        userService.isUserAdmin.subscribe(v => this.isUserAdmin = v);
    }
}
