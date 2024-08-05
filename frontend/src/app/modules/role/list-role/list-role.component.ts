import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/Role';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../core/services/encryption.service';


@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrl: './list-role.component.css'
})
export class ListRoleComponent implements OnInit{
  displayedColumns: string[] = ['Role', 'Privileges' ,'Actions'];
  dataSource!: MatTableDataSource<any>;
   authorities = ""
   updateRole =false
   deleteRole =false
   roles = 0

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    const authoritiesCrypted =localStorage.getItem('authorities') 
     this.authorities = this.encryptionService.decrypt(authoritiesCrypted!,"2f7")
     if(this.authorities.includes("EDIT::ROLE")){
      this.updateRole = true
     }
     if(this.authorities.includes("DELETE::ROLE"))
     {
      this.deleteRole =true

     }
    this.getRoles();
  }
 constructor(private router:Router,private roleService: RoleService,private encryptionService:EncryptionService){}

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

 getRoles() {
  this.roleService.getRoles().subscribe(
    {
      next : (res)=>
      {
        res.reverse();
        this.roles = res.length
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => 
      {
      }
    }
  );
}

onEditClick(id: string) {
    
  this.router.navigate(['/home/roles/update/'+id]);
}
delete(id : string)
{
  this.roleService.deleteRole(id).subscribe(
    {
      next: (res) => 
      {
        
        this.getRoles();
      },
      error : console.log,

    }
  )


}



  


}
