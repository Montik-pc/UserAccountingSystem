import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ItemUserComponent } from './components/item-user/item-user.component';
import { FormUserComponent } from './components/form-user/form-user.component';
import { UserService } from './services/user.service';

const routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'},
  {path: 'users', component: ListUsersComponent},
  {path: 'user/:id', component: FormUserComponent},
  {path: '**', redirectTo: '/users'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    ItemUserComponent,
    FormUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
