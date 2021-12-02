import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './header/header.module';
import { ContentModule } from './content/content.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { IwantToBeInjectedComponent } from './iwant-to-be-injected/iwant-to-be-injected.component';

@NgModule({
  declarations: [
    AppComponent,
    IwantToBeInjectedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    ContentModule,

    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
