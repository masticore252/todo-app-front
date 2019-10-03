import { Component, OnInit } from '@angular/core';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  private tasks: Task[]

  constructor( private taskService: TaskService, private alertService: AlertService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(
      (tasks) => this.tasks = tasks,
      (e) => this.alertService.modal({ text: e.error.error.join(', '), type: 'error' })
    )
  }

  addNewTask(task: Task) {
    this.tasks.push(task);
    this.taskService.getTasks().subscribe(
      (tasks) => this.tasks = tasks,
      (e) => this.alertService.modal({ text: e.error.error.join(', '), type: 'error' })
    )
  }

  updateTask(updatedTask: Task) {
    this.tasks = this.tasks.map(task =>  task.id == updatedTask.id ? updatedTask : task )
  }

  clearDoneTasks() {
    this.taskService.clearDoneTasks().subscribe(
      (success) => success ? this.tasks = this.tasks.filter( task => !task.done) : null,
      (e) => this.alertService.modal({ text: e.error.error.join(', '), type: 'error'})
    )
  }

}
