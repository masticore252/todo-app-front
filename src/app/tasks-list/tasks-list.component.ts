import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  private tasks: Task[]

  constructor( private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe( tasks => this.tasks = tasks )
  }


}
