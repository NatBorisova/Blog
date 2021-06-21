import { Component } from "@angular/core";
import { ArticlesService } from "../articles-table/articles.service";
import { SectionService } from "../sections-table/sections.service";
import { UserService } from "../services/user.service";

@Component({
    selector: "article-app",
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less']
})

export class ArticleComponent {

    constructor(private sectionService: SectionService, private userService: UserService, private articlesService: ArticlesService) {
    }
}
