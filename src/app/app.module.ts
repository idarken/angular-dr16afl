import { SelectorComponent } from './selector/selector.component';
import { TextboxComponent } from './boxes/textbox/textbox.component';
import { DropboxComponent } from './boxes/dropbox/dropbox.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DropboxComponent,
    TextboxComponent,
    SelectorComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
