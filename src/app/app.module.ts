import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { TaskService } from './tasks-list/task.service';
import { AppRoutingModule } from './app-routing.module';
import { TaskComponent } from './tasks-list/task/task.component';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskComponent,
    TaskFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
