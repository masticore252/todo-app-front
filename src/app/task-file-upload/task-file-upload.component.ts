import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { TaskService } from '../tasks-list/task.service';
import { AlertService } from '../alert.service';
import { Task } from '../tasks-list/task/task';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-task-file-upload',
  templateUrl: './task-file-upload.component.html',
  styleUrls: ['./task-file-upload.component.css']
})
export class TaskFileUploadComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];

  @Input()
  task: Task

  @Output()
  fileUploadedEvent: EventEmitter<Task> = new EventEmitter<Task>()

  constructor( private taskService: TaskService, private alertService: AlertService) { }

  ngOnInit() {
  }

  public dropped(files: NgxFileDropEntry[]) {

    this.files = files;

    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {

        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {

          this.taskService.uploadAttachment( this.task.id, file ).subscribe(
            (success) => {
              this.task.hasFile = true
              return this.fileUploadedEvent.emit(this.task)
            },
            (e) => this.alertService.modal({ text: e.error.error.join(', '), type: 'error' })
          )

        })

      }
    }

  }

  public fileOver(event){
    // console.log(event);
  }

  public fileLeave(event){
    // console.log(event);
  }

}
