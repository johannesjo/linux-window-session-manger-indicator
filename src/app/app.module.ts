import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MdlModule} from '@angular-mdl/core';
import {NgxElectronModule} from 'ngx-electron';

import {AppComponent} from './app.component';
import {SessionListComponent} from './session-list/session-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdlModule,
    NgxElectronModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
