import { Component, OnInit } from '@angular/core';
import { Task } from '../../../core/models/Task';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../../../core/services/task-service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit{
  Foyerupdate() {
    throw new Error('Method not implemented.');
    }
    taskId !:string|null
      task!:Task;
      updateForm!:FormGroup;
 constructor(  private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
  private taskService:TaskService,
    
    ){
     
    }

 ngOnInit() {
  if( this.route.paramMap.subscribe((paramMap) => {this.taskId= paramMap.get('id')})){
    if(this.taskId==null){
return
    }
      this.taskService.getTaskById(this.taskId).subscribe(
        (data: Task|String) => {
          
          if('title' in data){
            
            console.log(data);

            this.task = data;
            this.updateForm = this.formB.group({
              title: [''],
              description: [''],
              priority:[''],
              status:[''],
              updatedAt :['']
            });
           
            this.updateForm.patchValue(data);
            
          }
        }
       
        )
        ,
        (error: any) => {
          console.error('Error fetching user by ID:', error);
        }
      }
    }
    
    updatetask(){
   
      this.task.title=this.updateForm.value.title;
      this.task.description=this.updateForm.value.description;
      this.task.priority=this.updateForm.value.priority;
      this.task.status=this.updateForm.value.status;
      this.task.updatedAt=this.updateForm.value.updatedAt;
      this.taskService.updateTask(this.task.id,this.task).subscribe(
      (response) => {
        alert('User Updated Successfully!');
        console.log(this.task)
        this.router.navigate(['task/']);
  
      },
      (error) => {
        console.error('Update failed:', error);
      }
    );
    }
    
  
  }
  
 
