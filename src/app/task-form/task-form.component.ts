import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../tasks-list/task.service';
import { Task } from '../tasks-list/task/task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  @Input()
  buttonText: string

  @Output()
  newTaskEvent: EventEmitter<Task> = new EventEmitter<Task>()

  model: Task = { id: null, description: "", done: false, hasFile: false }

  constructor( private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.taskService.newTask(this.model).subscribe( task => {
      this.newTaskEvent.emit(task)
    })
  }

}
