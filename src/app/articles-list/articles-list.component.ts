import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest } from "rxjs";
import { ArticlesService, IArticle } from "../services/articles.service";
import { ISection, SectionService } from "../services/sections.service";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "articles-list-app",
    templateUrl: "./articles-list.component.html",
    styleUrls: ["./articles-list.component.less"]
})

export class ArticlesListComponent implements OnInit {

    @Input() authorLogin: string = "";
    @Input() sectionName: string = "";

    articles: IArticle[] = [];
    sections: ISection[] = [];
    users: IUser[] = [];
    currentUser: IUser;
    isUserAdmin: boolean = false;

    constructor(private sectionService: SectionService, private userService: UserService, private articlesService: ArticlesService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.currentUser = userService.createUser();
    }

    ngOnInit(): void {
        this.sectionService.getAllSections().subscribe((v: any) => { this.sections = v; },);
        this.userService.getAllUsers().subscribe((v: any) => { this.users = v; },);

        combineLatest([this.userService.user, this.userService.isUserAdmin, this.activatedRoute.params])
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
            this.articlesService.getAllAvailableArticles("", this.authorLogin, this.sectionName).subscribe((v: any) => this.articles = v);
            return;
        }

        this.articlesService.getAllAvailableArticles(this.currentUser.login, this.authorLogin, this.sectionName).subscribe((v: any) => {
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
}
