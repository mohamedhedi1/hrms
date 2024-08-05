import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../../../core/models/Task';
import { TaskService } from '../../../core/services/task-service';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit{
  formValid = false;
  users : any[]  = [];
  task: Task = new Task(); 
  assignedToEmail: string = '';;
  constructor(private taskService: TaskService, private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.getUsers();
  }
  add(form: NgForm) {
    if (form.valid) {
      const task: Task = {
        id: '',
        title: form.value.title,
        description: form.value.description,
        priority: form.value.priority,
        status: form.value.status,
        createBy: form.value.createBy,
        createdAt: form.value.createdAt,
        deadline: form.value.deadline,
        updatedAt: new Date(),
        assignedToEmail : form.value.assignedToEmail
      };

      this.taskService.addTask(task).subscribe(
        () => {
          alert('Added Successfully!');
          this.router.navigate(['/home/tasks/']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  getUsers() {
    this.userService.getAllUsers().subscribe(
      {
        next : (res: any)=>
        {
          console.log(res)
          this.users=res;
        },
        error: (err: any) => 
        {
          console.log(err);
        }
      }
    );

  }
}
