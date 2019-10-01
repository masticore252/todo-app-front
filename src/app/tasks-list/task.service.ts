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

  getAttachmentUrl(taskId: number): string{
    return this.url + "/" + taskId +"/attachment"
  }

  newTask(task: Task): Observable<Task> {
    return this.http.post(this.url, { description: task.description })
      .pipe(catchError( e => {
        console.log(e.error.errors.description)
        alert(e.error.errors.description.join(', '))
        return throwError(e)
      }))
      .pipe(map( response => response['data'] as Task))
  }

  updateTask(task: Task): Observable<Task> {
    // return Observable.create() as Observable<Task>

    return this.http.put(this.url+"/"+task.id, { description: task.description, done: task.done })
    .pipe(map( response => response['data'] as Task ))
    .pipe(catchError( e => throwError(e) ))

  }

  clearDoneTasks(): Observable<boolean> {
    return this.http.delete(this.url+"/delete_done", { observe: 'response' })
    .pipe(map( response => response['status'] == 200 ))
    .pipe(catchError( e => throwError(e) ))

  }

}
