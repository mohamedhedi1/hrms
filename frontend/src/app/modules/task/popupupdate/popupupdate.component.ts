import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Task } from '../../../core/models/Task';
import { UserService } from '../../../core/services/user.service';
import { TaskService } from '../../../core/services/task-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-popupupdate',
  templateUrl: './popupupdate.component.html',
  styleUrl: './popupupdate.component.css'
})
export class PopupupdateComponent implements OnInit{

  inputdata:any;
  savemessage='this task is saved'
  formValid = false;
  users : any[]  = [];
  task: Task = new Task(); 
  assignedToEmail: string = '';
;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<PopupupdateComponent>,private taskService: TaskService, private router: Router, private userService: UserService){

  }
  ngOnInit(): void {
    this.getUsers();
    this.inputdata=this.data;
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
          console.log(task);
    this.ref.close('Closed using function');
    window.location.reload();
          this.router.navigate(['/home/tasks/']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  closepopup(){
this.ref.close('Closed using function');
  }
  saveData(): void {
    // Implement your logic here to save the data
    console.log('Saving data...');
    this.ref.close('Closed using function');

  }

}


 


