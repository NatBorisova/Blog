import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticlesService, IArticle } from "../services/articles.service";
import { SectionService } from "../services/sections.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "article-app",
    templateUrl: "./article.component.html",
    styleUrls: ["./article.component.less"]
})

export class ArticleComponent {

    article: IArticle;
    isUserAdmin: boolean = false;
    isUserAuthor: boolean = false;
    canUserComment: boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private route: Router, private articlesService: ArticlesService, private sectionService: SectionService, private userService: UserService) {
        this.article = articlesService.createArticle();
        activatedRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.article = JSON.parse(queryParam.article);
            },
        );
        userService.user.subscribe((v: any) => {
            if (this.article.canComment) {
                // const user = this.article.canComment.find(user => user.objectId === v.objectId);
                if (this.article.canComment.find(user => user.objectId === v.objectId)) {
                    this.canUserComment = true;
                }
            }
            if (this.article.author.objectId === v.objectId) {
                this.isUserAuthor = true;
            }
        });
        userService.isUserAdmin.subscribe(v => this.isUserAdmin = v);
    }

    deleteArticle(): void {
        this.articlesService.deleteArticle(this.article.objectId).subscribe(
            () => {
                this.route.navigate(["/"]);
            },
            (e) => { console.log(e); },
        );
    }

    disableArticle(): void {
        this.articlesService.changeStatus(this.article.objectId, false).subscribe(
            () => {
                this.article.isDisabled = false;
            },
            (e) => { console.log(e); },
        );
    }
}
