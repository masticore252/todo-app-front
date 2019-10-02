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

  uploadAttachment( taskId: number, file: File ): Observable<boolean> {

    const url = `${this.url}/${taskId}/attachment`

    const body = new FormData()
    body.append('attachment', file, file.name)
    body.append('mime-type', file.type)

    return this.http.post(url, body).pipe(map(
      (response) => !response['error']
    ))

  }

  newTask(task: Task): Observable<Task> {
    return this.http.post(this.url, { description: task.description })
      .pipe(catchError( e => throwError(e) ))
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
