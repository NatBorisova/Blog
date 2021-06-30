import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin, Subject } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";
import { IArticle } from "../interfaces/IArticle";
import { ArticlesService } from "../services/articles.service";
import { SectionService } from "../services/sections.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "article-app",
    templateUrl: "./article.component.html",
    styleUrls: ["./article.component.less"]
})

export class ArticleComponent implements OnInit, OnDestroy {

    article: IArticle;
    isUserAdmin: boolean = false;
    isUserAuthor: boolean = false;
    canUserComment: boolean = false;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private activatedRoute: ActivatedRoute, private route: Router, private articlesService: ArticlesService, private sectionService: SectionService, private userService: UserService) {
        this.article = articlesService.createArticle();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.pipe(
            mergeMap(data => {
                this.article = JSON.parse(data.article);
                return forkJoin([this.userService.user, this.userService.isUserAdmin]);
            }),
            takeUntil(this._onDestroy),
        ).subscribe(result => {
            if (this.article.canComment) {
                if (this.article.canComment.find(user => user.objectId === result[0].objectId)) {
                    this.canUserComment = true;
                }
            }
            if (this.article.author.objectId === result[0].objectId) {
                this.isUserAuthor = true;
            }
            this.isUserAdmin = result[1];
        });
    }

    deleteArticle(): void {
        this.articlesService.deleteArticle(this.article.objectId)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => {
                    this.route.navigate(["/"]);
                },
                (e) => { console.log(e); },
            );
    }

    disableArticle(): void {
        this.articlesService.changeStatus(this.article.objectId, false)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => {
                    this.article.isDisabled = false;
                },
                (e) => { console.log(e); },
            );
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
