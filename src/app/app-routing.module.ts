import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EventCreateComponent } from './event-create/event-create.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventBrowseComponent } from './event-browse/event-browse.component';
import { ReviewEditComponent } from './review-edit/review-edit.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { ReviewBrowseComponent } from './review-browse/review-browse.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { EventStatsComponent } from './event-stats/event-stats.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'user-signup', component: UserSignupComponent},
    {path: 'user-signin', component: UserSigninComponent},
    {path: 'user-dashboard/:listType/:pageSize/:pageId', component: UserDashboardComponent, canActivate:[AuthGuardService]},
    {path: 'event-create', component: EventCreateComponent, canActivate:[AuthGuardService]},
    {path: 'event-browse/:pageSize/:pageId', component: EventBrowseComponent},
    {path: 'event-details/:id', component: EventDetailsComponent},
    {path: 'event-stats/:id', component: EventStatsComponent, canActivate:[AuthGuardService]},
    //{path: 'event-search/:pageSize/:pageId/:searchText', component: EventSearchComponent},
    {path: 'review-browse/:eventId/:pageSize/:pageId', component: ReviewBrowseComponent},
    {path: 'review-edit/:id', component: ReviewEditComponent, canActivate:[AuthGuardService]},
    {path: 'chat-room/:eventId', component: ChatRoomComponent, canActivate:[AuthGuardService]},
    { path: '', redirectTo: 'event-browse/6/0', pathMatch: 'full' },
    { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
