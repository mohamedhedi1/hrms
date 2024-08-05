import { Component } from '@angular/core';
import { DepartmentService } from '../../../core/services/department.service';
import { ActivatedRoute , Router} from '@angular/router';
import { Department } from '../../../core/models/Department';

@Component({
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrl: './list-departement.component.css'
})
export class ListDepartementComponent {
  onDelete(id:string) {
    this.departmentService.deleteDepartment(id).subscribe((next: any)=>{this.ngOnInit()
    })
    }
    navigateToUpdate(id:string) {
      console.log(id)
      this.router.navigateByUrl('home/department/UpdateDepartment/'+id)
    }
      constructor(private departmentService:DepartmentService,private route: ActivatedRoute,
        private router: Router){}
    
    navigatetoAdd() {
      this.router.navigateByUrl('home/department/AddDepartment')
      
    }
    departments:Department[]=[];
      ngOnInit(): void {
        this.departmentService.getAll().subscribe((data: Department[])=>{
          console.log(data),
          this.departments=data
        }
          )
      }
      
}
