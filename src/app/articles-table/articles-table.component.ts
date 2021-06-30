import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IArticle } from "../interfaces/IArticle";
import { ArticlesService } from "../services/articles.service";

@Component({
    selector: "articles-table-app",
    templateUrl: "./articles-table.component.html",
    styleUrls: ["./articles-table.component.less"]
})

export class ArticlesTableComponent implements OnInit, OnDestroy {

    articles: IArticle[] = [];
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private articlesService: ArticlesService, private router: Router) { }

    ngOnInit(): void {
        this.updateArticles();
    }

    updateArticles(): void {
        this.articlesService.getAllArticles()
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                (v: IArticle[]) => { this.articles = v; },
                (e) => { console.log(e); },
            );
    }

    deleteArticle(objectId: string): void {
        this.articlesService.deleteArticle(objectId)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => { this.updateArticles(); },
                (e) => { console.log(e); },
            );
    }

    openArticle(article: IArticle): void {
        this.router.navigate(["/article", article.title],
            {
                queryParams: {
                    "article": JSON.stringify(article)
                }
            });
    }

    changeStatus(objectId: string, isDisabled: boolean): void {
        this.articlesService.changeStatus(objectId, isDisabled)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(
                () => { this.updateArticles(); },
                (e) => { console.log(e); },
            );
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
