import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Department } from '../../../core/models/Department';
import { DepartmentService } from '../../../core/services/department.service';

@Component({
  selector: 'app-update-departement',
  templateUrl: './update-departement.component.html',
  styleUrl: './update-departement.component.css'
})
export class UpdateDepartementComponent implements OnInit{

      id !:string|null
      department!: Department;
      updateForm!:FormGroup;


      constructor(  private route: ActivatedRoute,
        private router: Router,
        private formB: FormBuilder,
        private departmentService: DepartmentService,
        
        ){
     
        }
  
        ngOnInit() {
          if( this.route.paramMap.subscribe((paramMap) => {this.id= paramMap.get('id')})){
           if(this.id==null){
       return
           }
             this.departmentService.getDepartmentById(this.id).subscribe(
               (data: Department|String) => {
                 
                 if('name' in data){
                   
                   console.log(data);
       
                   this.department = data;
                   this.updateForm = this.formB.group({
                     name: [''],
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
     
  
                
              
      updatedepartment(){
    
        this.department.name=this.updateForm.value.name;
    
        this.departmentService.updateDepartment(this.department.id,this.department).subscribe(
        (response) => {
          alert('department Updated Successfully!');
          console.log(this.department)
          this.router.navigate(['home/department/']);
    
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
      }
      
}

