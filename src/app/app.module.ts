import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdministrationFormComponent } from './administration-form/administration-form.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { UserService } from './services/user.service';
import { UserTableComponent } from './users-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    AdministrationFormComponent,
    UserTableComponent
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
