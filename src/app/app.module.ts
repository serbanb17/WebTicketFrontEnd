import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent, SafePipe } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EventCreateComponent } from './event-create/event-create.component';
import { UserSigninComponent } from './user-signin/user-signin.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { EventBrowseComponent } from './event-browse/event-browse.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ReviewEditComponent } from './review-edit/review-edit.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { ReviewBrowseComponent } from './review-browse/review-browse.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { EventStatsComponent } from './event-stats/event-stats.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SafePipe,
    UserDashboardComponent,
    EventCreateComponent,
    UserSigninComponent,
    UserSignupComponent,
    EventBrowseComponent,
    EventDetailsComponent,
    ReviewBrowseComponent,
    ReviewEditComponent,
    RouteNotFoundComponent,
    EventSearchComponent,
    ChatRoomComponent,
    EventStatsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
