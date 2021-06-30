import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IArticle } from "../interfaces/IArticle";
import { ISection } from "../interfaces/ISection";
import { IUser } from "../interfaces/IUser";
import { ArticlesService } from "../services/articles.service";
import { SectionService } from "../services/sections.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "articles-list-app",
    templateUrl: "./articles-list.component.html",
    styleUrls: ["./articles-list.component.less"]
})

export class ArticlesListComponent implements OnInit, OnDestroy {

    @Input() authorLogin: string = "";
    @Input() sectionName: string = "";

    articles: IArticle[] = [];
    sections: ISection[] = [];
    users: IUser[] = [];
    currentUser: IUser;
    isUserAdmin: boolean = false;
    private _onDestroy: Subject<void> = new Subject<void>();

    constructor(private sectionService: SectionService, private userService: UserService, private articlesService: ArticlesService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.currentUser = userService.createUser();
    }

    ngOnInit(): void {
        this.sectionService.getAllSections()
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: ISection[]) => { this.sections = v; });
        this.userService.getAllUsers()
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: IUser[]) => { this.users = v; });

        combineLatest([this.userService.user, this.userService.isUserAdmin, this.activatedRoute.params])
            .pipe(takeUntil(this._onDestroy))
            .subscribe(result => {
                this.currentUser = result[0];
                this.isUserAdmin = result[1];
                if (result[2].authorLogin) {
                    this.authorLogin = result[2].authorLogin;
                }
                if (result[2].sectionName) {
                    this.sectionName = result[2].sectionName;
                }
                this.getArticles();
            });
    }

    getArticles(): void {
        if (!this.currentUser.objectId || this.isUserAdmin) {
            this.articlesService.getAllArticles(this.authorLogin, this.sectionName)
                .pipe(takeUntil(this._onDestroy))
                .subscribe((v: IArticle[]) => this.articles = v);
            return;
        }

        this.articlesService.getAllAvailableArticles(this.currentUser.login, this.authorLogin, this.sectionName)
            .pipe(takeUntil(this._onDestroy))
            .subscribe((v: IArticle[]) => {
                this.articles = v;
            });
    }

    openArticle(article: IArticle): void {
        this.router.navigate(["/article", article.title],
            {
                queryParams: {
                    "article": JSON.stringify(article)
                }
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
