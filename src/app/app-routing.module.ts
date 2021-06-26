import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdministrationFormComponent } from "./administration-form/administration-form.component";
import { ArticleFormComponent } from "./article-form/article-form.component";
import { ArticleComponent } from "./article/article.component";
import { ArticlesListComponent } from "./articles-list/articles-list.component";
import { AdministrationGuard } from "./guards/administration-form.guard";
import { LoginGuard } from "./guards/login-form.guard";
import { InfoComponent } from "./info/info.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { MessageFormComponent } from "./message-form/message-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegistrationFormComponent } from "./registration-form/registration-form.component";

const routes: Routes = [
  { path: "", component: ArticlesListComponent },
  { path: "login", component: LoginFormComponent, canActivate: [LoginGuard] },
  { path: "registration", component: RegistrationFormComponent },
  { path: "administration", component: AdministrationFormComponent, canActivate: [AdministrationGuard] },
  { path: "info", component: InfoComponent },
  { path: "addArticle", component: ArticleFormComponent },
  { path: "article/:title", component: ArticleComponent },
  { path: "message", component: MessageFormComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdministrationGuard, LoginGuard],
})
export class AppRoutingModule { }
