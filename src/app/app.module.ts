import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { JwtModule } from '@auth0/angular-jwt';

import { FormsModule } from '@angular/forms';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notauth.guard';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateGroupComponent } from './components/groups/create-group/create-group.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyGroupsComponent } from './components/groups/my-groups/my-groups.component';
import { GroupsService } from './services/groups.service';
import { GroupPageComponent } from './components/groups/group-page/group-page.component';
import { SocketService } from './services/socket.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, canActivate: [AuthGuard], pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent, canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent, canActivate: [NotAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path: 'groups/create',
    component: CreateGroupComponent, canActivate: [AuthGuard]
  },
  {
    path: 'groups/my',
    component: MyGroupsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'groups/:id',
    component: GroupPageComponent, canActivate: [AuthGuard]
  }
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    CreateGroupComponent,
    ProfileComponent,
    MyGroupsComponent,
    GroupPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter,
    //     skipWhenExpired: true,
    //     whitelistedDomains: ['https://bigtomato.herokuapp.com'],
    //     // blacklistedRoutes: ['example.com/examplebadroute/']
    //   }
    // })
  ],
  providers: [
    FlashMessagesService,
    AuthService,
    AuthGuard,
    NotAuthGuard,
    GroupsService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
