import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdlModule} from '@angular-mdl/core';
import {NgxElectronModule} from 'ngx-electron';
import {AppComponent} from './app.component';
import {SessionListComponent} from './session/session-list/session-list.component';
import {SessionEntryComponent} from './session/session-entry/session-entry.component';
import {WindowDataEntryComponent} from './session/window-data-entry/window-data-entry.component';
import {BusyConfig, BusyModule} from 'angular2-busy';

@NgModule({
  declarations: [
    AppComponent,
    SessionListComponent,
    SessionEntryComponent,
    WindowDataEntryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdlModule,
    BusyModule.forRoot(
      new BusyConfig({
        backdrop: true,
        delay: 0,
        minDuration: 300,
      })
    ),
    NgxElectronModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/session-list',
        pathMatch: 'full'
      },
      {
        path: 'session-list',
        component: SessionListComponent
      },
      {
        path: 'session/:sessionName',
        component: SessionEntryComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

