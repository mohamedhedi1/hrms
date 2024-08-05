import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task-service';
import { Task } from '../../../core/models/Task';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';
import { forkJoin } from 'rxjs';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { trigger, transition, style, animate } from '@angular/animations';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { PopupupdateComponent } from '../popupupdate/popupupdate.component';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
  animations: [
    trigger('itemDrag', [
      transition(':enter', [
        style({ transform: 'scale(1)' }),
        animate('0.3s ease-out', style({ transform: 'scale(1.2)' })),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class ListTaskComponent implements OnInit {
  isDragging: boolean = false;
  formValid = false;
  users: any[] = [];
  task: Task = new Task();
  assignedToEmail: string = '';
  tasks: Task[] = [];
  email!: string;

  // Boolean to track whether the add task modal is open
  isAddTaskModalOpen: boolean = false;
  isModalOpen = false;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnInit(): void {
    this.getUsers();
    this.loadTasks();
  }

  onDragStart(event: DragEvent, taskId: string): void {
    event.dataTransfer?.setData("text/plain", taskId);
    console.log("hhhh");
    console.log(taskId)
  }

  addTask(form: NgForm) {
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
        assignedToEmail: form.value.assignedToEmail
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
        next: (res: any) => {
          console.log(res)
          this.users = res;
        },
        error: (err: any) => {
          console.log(err);
        }
      }
    );
  }

  loadTasks(): void {
    const userProfileString = localStorage.getItem('user');
    if (userProfileString) {
      const userProfile = JSON.parse(userProfileString);
      this.email = userProfile['email'];
    }
    // Fetch tasks
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks.filter(task => task.assignedToEmail === this.email);
      console.log(this.tasks);
    });
  }

  // navigateToUpdate(id: string): void {
  //   console.log(id);
  //   this.router.navigate(['/home/tasks/UpdateTask/' + id]);
  // }

  navigateToAdd(): void {
    this.router.navigate(['/home/tasks/AddTask']);
  }

  // Method to open the add task modal
  openAddTaskModal() {
    this.isAddTaskModalOpen = true;
  }

  // Method to close the add task modal
  closeAddTaskModal() {
    this.isAddTaskModalOpen = false;
  }
  Openpopupupdate() {
    var _popup = this.dialog.open(PopupupdateComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: 'Update Task'
      }
    });
    _popup.afterClosed().subscribe(item => {
      console.log(item)
    })
  }
  Openpopup() {
    var _popup = this.dialog.open(PopupComponent, {
      width: '60%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: 'Add Task'
      }
    });
    _popup.afterClosed().subscribe(item => {
      console.log(item)
    })
  }

  // Drag and drop functionality
  allowDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;

  }

  onDelete(event : DragEvent): void {
    const taskId = event.dataTransfer?.getData("text/plain");
    if (taskId){
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks(); // Reload the task list after deletion
      this.isDragging = false;
    }, (error) => {
      console.error('Error deleting task:', error);
      // Optionally, show a message to the user indicating that deletion failed
    });
  }}

  drop(event: DragEvent) {
    event.preventDefault();
    const taskId = event.dataTransfer?.getData('text/plain');
    const task = this.tasks.find(t => t.id === taskId);
    this.isDragging = false;
    if (task) {
      this.onDelete(event);
    }
    //this.isDragging = false;
    //this.loadTasks(); // Reload the task list after deletion

  }
}
