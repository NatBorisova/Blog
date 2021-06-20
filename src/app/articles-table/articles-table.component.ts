import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ISection } from "../sections-table/sections-table.component";
import { AdministrationService } from "../services/administration.service";
import { RegistrationService } from "../services/registration.service";
import { IUser, UserService } from "../services/user.service";

export interface IArticle {
    created: string;
    title: string;
    author: IUser;
    section: ISection;
    isDisabled: boolean;
    objectId: string;
}

@Component({
    selector: "articles-table-app",
    templateUrl: './articles-table.component.html',
    styleUrls: ['./articles-table.component.less']
})

export class ArticlesTableComponent {

    articles: IArticle[] = [];

    constructor(private router: Router, private userService: UserService, private administrationService: AdministrationService, private registrationService: RegistrationService) {
        this.updateArticles();
    }

    updateArticles() { 
        this.administrationService.getAllArticles().subscribe((v: any) => { 
            this.articles = v;
         });
    }

    disableArticle() { }

    deleteArticle(objectId: string) { }

    openArticle() { }

    changeStatus(objectId: string, isDisabled: boolean) { }
    // deleteUser(objectId: string): void {
    //     this.administrationService.deleteUser(objectId).subscribe(
    //         () => { this.updateUsers() }
    //     );
    // }
}
