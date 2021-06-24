import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticlesService, IArticle } from "../services/articles.service";
import { ISection, SectionService } from "../sections-table/sections.service";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "articles-list-app",
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.less']
})

export class ArticlesListComponent implements OnInit {

    @Input() filter: any = {
        author: this.userService.createUser(),
        section: this.sectionService.createSection(),
    };
    articles: IArticle[] = [];
    sections: ISection[] = [];
    users: IUser[] = [];
    currentUser: IUser;
    isUserAdmin: boolean = false;

    constructor(private sectionService: SectionService, private userService: UserService, private articlesService: ArticlesService, private router: Router, private activateRoute: ActivatedRoute) {
        this.currentUser = userService.createUser();
    }

    ngOnInit() {
        this.sectionService.getAllSections().subscribe((v: any) => { this.sections = v });
        this.userService.getAllUsers().subscribe((v: any) => { this.users = v });
        this.userService.user.subscribe(v => {
            this.currentUser = v;
            this.userService.isUserAdmin.subscribe((v) => {
                this.isUserAdmin = v;
                this.getArticles();
            });
        });
        this.activateRoute.params.subscribe(params => {
            if (params.login) {
                this.filter.author = this.currentUser;
            }
        });
    }

    getArticles() {
        const authorObjectId = this.filter.author.objectId;
        const sectionObjectId = this.filter.section.objectId;

        if (!this.currentUser.objectId || this.isUserAdmin) {
            this.articlesService.getAllArticles().subscribe((v: any) => this.articles = v);
            return;
        }
        if (authorObjectId && sectionObjectId) {
            this.articlesService.getAllAvailableArticles(this.currentUser.objectId, authorObjectId, sectionObjectId).subscribe((v: any) => this.articles = v);
            return;
        } else if (authorObjectId) {
            this.articlesService.getAllAvailableArticles(this.currentUser.objectId, authorObjectId).subscribe((v: any) => this.articles = v);
            return;
        } else if (sectionObjectId) {
            this.articlesService.getAllAvailableArticles(this.currentUser.objectId, "", sectionObjectId).subscribe((v: any) => this.articles = v);
            return;
        }
        this.articlesService.getAllAvailableArticles(this.currentUser.objectId).subscribe((v: any) => this.articles = v);
    }

    openArticle(article: IArticle) {
        this.router.navigate(["/article", article.title],
            {
                queryParams: {
                    'article': JSON.stringify(article)
                }
            });
    }
}
