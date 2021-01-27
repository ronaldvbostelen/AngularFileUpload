import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from '@uiowa/spinner';
import { HttpClientModule } from '@angular/common/http';

import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';
import { MultipleFilesUploadComponent } from './multiple-files-upload/multiple-files-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    SingleFileUploadComponent,
    MultipleFilesUploadComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SpinnerModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
