import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {

  @Input()
  task: Task

  @Output()
  taskUpdateEvent: EventEmitter<Task> = new EventEmitter<Task>()

  constructor( private taskService: TaskService) { }

  ngOnInit() {
  }

  getAttachmentUrl(taskId: number): string {
    return this.taskService.getAttachmentUrl(taskId)
  }

  toggleState(event: Event): void {
    this.taskService.updateTask(this.task).subscribe(
      (task) => this.taskUpdateEvent.emit(task),
      (e) => this.task = {...this.task, done: !this.task.done }
    )
  }

  fileUploaded(task: Task){
    this.task = { ...this.task, hasFile: task.hasFile }
    this.taskUpdateEvent.emit(this.task)
  }


}
