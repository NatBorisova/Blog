import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ArticlesService, IArticle } from "../services/articles.service";

@Component({
    selector: "articles-table-app",
    templateUrl: './articles-table.component.html',
    styleUrls: ['./articles-table.component.less']
})

export class ArticlesTableComponent {

    articles: IArticle[] = [];

    constructor(private articlesService: ArticlesService, private router: Router) {
        this.updateArticles();
    }

    updateArticles() {
        this.articlesService.getAllArticles().subscribe(
            (v: any) => { this.articles = v; },
            (e) => { console.log(e); }
        );
    }

    deleteArticle(objectId: string) {
        this.articlesService.deleteArticle(objectId).subscribe(
            () => { this.updateArticles() },
            (e) => { console.log(e); }
        );
    }

    openArticle(article: IArticle) {
        this.router.navigate(["/article", article.title], 
        {
            queryParams:{
                'article': JSON.stringify(article)
            }
        });
    }

    changeStatus(objectId: string, isDisabled: boolean) {
        this.articlesService.changeStatus(objectId, isDisabled).subscribe(
            () => { this.updateArticles() },
            (e) => { console.log(e); }
        );
    }
}
