import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Task } from './task/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = "http://localhost:8000/api/tasks";

  constructor( private http: HttpClient ) { }

  getTasks(): Observable<Task[]> {
    return this.http.get(this.url)
      .pipe(catchError(e => throwError(e) ))
      .pipe(map( response => response['data'] as Task[] ))
  }

  getAttachmentUrl(taskId: number){
    return this.url + "/" + taskId +"/attachment"
  }

}
