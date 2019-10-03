import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { TaskService } from './task/task.service';
import { AppRoutingModule } from './app-routing.module';
import { TaskComponent } from './task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { AlertService } from './alert.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TaskFileUploadComponent } from './task-file-upload/task-file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent,
    TaskFormComponent,
    TaskFileUploadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgxFileDropModule,
  ],
  providers: [
    TaskService,
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
