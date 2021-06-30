import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { forkJoin, Subject } from "rxjs";
import { mergeMap, takeUntil } from "rxjs/operators";
import { INewArticle } from "../interfaces/INewArticle";
import { ISection } from "../interfaces/ISection";
import { IUser } from "../interfaces/IUser";
import { ArticlesService } from "../services/articles.service";
import { SectionService } from "../services/sections.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "article-form-app",
    templateUrl: "./article-form.component.html",
    styleUrls: ["./article-form.component.less"]
})

export class ArticleFormComponent implements OnInit, OnDestroy {

    sections: ISection[] = [];
    newSection: string = "";
    users: IUser[] = [];
    article: INewArticle;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private sectionService: SectionService, private userService: UserService, private articlesService: ArticlesService, private router: Router) {
        this.article = articlesService.createNewArticle();
    }

    ngOnInit(): void {
        this.sectionService.getAllSections()
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: ISection[]) => { this.sections = v; });
        this.userService.getAllUsers()
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: IUser[]) => { this.users = v; });
        this.userService.user
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: IUser) => { this.article.author = v; });
    }

    addArticle(): void {
        this.article.canWatch.push(this.article.author);
        this.article.canComment.push(this.article.author);
        this.articlesService.addArticle(JSON.stringify(this.article))
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => this.router.navigate(["/"]),
                e => console.log(e));
    }

    addNewSection(): void {
        this.sectionService.addNewSection(this.newSection).pipe(
            mergeMap(() => {
                return forkJoin([this.sectionService.getAllSections()]);
            }),
            takeUntil(this._onDestroy),
        ).subscribe(result => {
            this.sections = result[0];
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
