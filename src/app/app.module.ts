import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { httpInterceptorProviders } from './interceptors';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HerosComponent } from './modules/heros/heros.component';
import { HeroDetailComponent } from './modules/hero-detail/hero-detail.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HeroSearchComponent } from './modules/hero-search/hero-search.component';
import { HighlightDirective } from './highlight.directive';
import { UnlessDirective } from './unless.directive';
import { ExponentialStrengthPipe } from './exponential-strength.pipe';
import { VersionChildComponent } from './modules/comp-interaction/version-child/version-child.component';
import { VersionParentComponent } from './modules/comp-interaction/version-parent/version-parent.component';
import { CompInteractionComponent } from './modules/comp-interaction/comp-interaction/comp-interaction.component';
import { MissionControlComponent } from './modules/mission-control/mission-control.component';
import { AstronautComponent } from './modules/astronaut/astronaut.component';

@NgModule({
  declarations: [
    AppComponent,
    HerosComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HighlightDirective,
    UnlessDirective,
    ExponentialStrengthPipe,
    VersionChildComponent,
    VersionParentComponent,
    CompInteractionComponent,
    MissionControlComponent,
    AstronautComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
