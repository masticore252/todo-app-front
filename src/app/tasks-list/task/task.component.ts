import { Component, OnInit, Input } from '@angular/core';
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

  constructor( private taskService: TaskService) { }

  ngOnInit() {
  }

  getAttachmentUrl(taskId: number): string {
    return this.taskService.getAttachmentUrl(taskId)
  }

}
