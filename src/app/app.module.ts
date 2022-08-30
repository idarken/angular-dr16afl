import { SelectorComponent } from './selector/selector.component';
import { TextboxComponent } from './boxes/textbox/textbox.component';
import { DropboxComponent } from './boxes/dropbox/dropbox.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DragAndDropDirective } from './shared/drag-and-drop.directive';

@NgModule({
  declarations: [
    AppComponent,
    DropboxComponent,
    TextboxComponent,
    SelectorComponent,
    DragAndDropDirective,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
