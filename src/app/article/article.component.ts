import { IUser } from './../interfaces/IUser';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
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

        this.activatedRoute.queryParams
            .pipe(takeUntil(this._onDestroy))
            .subscribe(data => this.article = JSON.parse(data.article));
        this.userService.user
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: IUser) => {
                if (this.article.canComment) {
                    if (this.article.canComment.find(user => user.objectId === v.objectId)) {
                        this.canUserComment = true;
                    }
                }
                if (this.article.author.objectId === v.objectId) {
                    this.isUserAuthor = true;
                }
            });
        this.userService.isUserAdmin
            .pipe(takeUntil(this._onDestroy))
            .subscribe(v => this.isUserAdmin = v);
    }

    deleteArticle(): void {
        this.articlesService.deleteArticle(this.article.objectId)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => {
                    this.route.navigate(["/"]);
                },
                (e) => { },
            );
    }

    disableArticle(): void {
        this.articlesService.changeStatus(this.article.objectId, false)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => {
                    this.article.isDisabled = false;
                },
                (e) => { },
            );
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
