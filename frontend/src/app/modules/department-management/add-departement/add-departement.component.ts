import { Component } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Department } from '../../../core/models/Department';

@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrl: './add-departement.component.css'
})
export class AddDepartementComponent {
  constructor(private departmentservice:DepartmentService,private router:Router) { }

  add(form: NgForm) {
    if(form.valid){
     const departement: Department ={
      id:'',
       name: form.value.name,
       Detail_department:form.value.Detail_department
     }
     this.departmentservice.addDepartment(departement).subscribe(
       () => {
         alert('Added Successfully!');
         this.router.navigate(['home/department']);
       },
       error => {
         console.error(error);
 
       }
     );
    }
   }
}
