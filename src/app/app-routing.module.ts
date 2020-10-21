import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { AddPasswordComponent } from './add-password/add-password.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CategoryComponent } from './category/category.component';
import { ContactPageComponent } from './contact-page/contact-page.component';

import { RouteGaurd } from './route.gaurd';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'password', component: PasswordsComponent },
      { path: 'addpassword', component: AddPasswordComponent },
      { path: 'categories/:type', component: CategoryComponent },
      // { path: 'social', component: CategoryComponent },
      // { path: 'banks', component: CategoryComponent },
      // { path: 'others', component: CategoryComponent },
      { path: 'contact', component: ContactPageComponent }
    ],
    canActivate: [RouteGaurd]
  },
  { path: 'changepassword', component: ChangepasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
