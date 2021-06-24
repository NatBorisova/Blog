import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ArticlesService } from "../services/articles.service";
import { ISection, SectionService } from "../sections-table/sections.service";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "article-form-app",
    templateUrl: './article-form.component.html',
    styleUrls: ['./article-form.component.less']
})

export class ArticleFormComponent {

    sections: ISection[] = [];
    users: IUser[] = [];
    article: any = {
        title: "",
        text: "",
        author: this.userService.createUser(),
        section: this.sectionService.createSection(),
        canComment: [],
        canWatch: [],
        isDisabled: false,
    };

    constructor(private sectionService: SectionService, private userService: UserService, private articlesService: ArticlesService, private router: Router) {
        console.log("add-article");
        
        sectionService.getAllSections().subscribe((v: any) => { this.sections = v });
        userService.getAllUsers().subscribe((v: any) => { this.users = v });
        userService.user.subscribe(v => { this.article.author = v; });
    }

    addArticle() {
        this.articlesService.addArticle(JSON.stringify(this.article)).subscribe(
            () => this.router.navigate(["/"]),
            e => console.log(e));
    }
}
