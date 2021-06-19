import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationFormComponent } from './administration-form/administration-form.component';
import { AdministrationGuard } from './guards/administration-form.guard';
import { LoginGuard } from './guards/login-form.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

const routes: Routes = [
  { path: "login", component: LoginFormComponent, canActivate: [LoginGuard]  },
  { path: "registration", component: RegistrationFormComponent },
  { path: 'administration', component: AdministrationFormComponent, canActivate: [AdministrationGuard] },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdministrationGuard, LoginGuard],
})
export class AppRoutingModule { }