import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ArticlesService } from "../services/articles.service";
import { ISection, SectionService } from "../services/sections.service";
import { IUser, UserService } from "../services/user.service";

@Component({
    selector: "article-form-app",
    templateUrl: "./article-form.component.html",
    styleUrls: ["./article-form.component.less"]
})

export class ArticleFormComponent {

    sections: ISection[] = [];
    newSection: string = "";
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
        sectionService.getAllSections().subscribe((v: any) => { this.sections = v; });
        userService.getAllUsers().subscribe((v: any) => { this.users = v; });
        userService.user.subscribe(v => { this.article.author = v; });
    }

    addArticle(): void {
        this.article.canWatch.push(this.article.author);
        this.article.canComment.push(this.article.author);
        this.articlesService.addArticle(JSON.stringify(this.article)).subscribe(
            () => this.router.navigate(["/"]),
            e => console.log(e));
    }

    addNewSection(): void {
        this.sectionService.addNewSection(this.newSection).subscribe(
            () => {
                this.newSection = "";
                this.sectionService.getAllSections().subscribe((v: any) => { this.sections = v; });
            },
            e => console.log(e));
    }
}
