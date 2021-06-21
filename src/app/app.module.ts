import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdministrationFormComponent } from './administration-form/administration-form.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleComponent } from './article/article.component';
import { ArticlesTableComponent } from './articles-table/articles-table.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormatToDatePipe } from './pipes/format.pipe';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { SectionsTableComponent } from './sections-table/sections-table.component';
import { UserService } from './services/user.service';
import { UserTableComponent } from './users-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    AdministrationFormComponent,
    UserTableComponent,
    SectionsTableComponent,
    ArticleComponent,
    ArticlesTableComponent,
    ArticleFormComponent,
    FormatToDatePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
