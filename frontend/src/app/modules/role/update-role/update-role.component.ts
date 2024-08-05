import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../core/services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../core/models/Role';
import { Privilege } from '../../../core/models/Privilege';
import { PrivilegeService } from '../../../core/services/privilege.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.css',
})
export class UpdateRoleComponent implements OnInit {
  id!: string;
  role!: any;
  selectedPrivileges: string[] = [];
  privileges: Privilege[] = [];
  myForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private roleService: RoleService,
    private privilegeService: PrivilegeService,
    private route: ActivatedRoute
  ) {
    this.myForm = this.fb.group({
      roleTitle: ['', [Validators.pattern('[a-zA-Z]+'), Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.getRoleById(this.id);
    this.getPrivileges();
  }
  getPrivileges() {
    this.privilegeService.getPrivileges().subscribe(
      (res: any[]) => {
        this.privileges = res;
        this.myForm.patchValue({
          id: this.role.id,
          roleTitle: this.role.name,
        });
      },
      (err: any) => {
      }
    );
  }

  getRoleById(id: string) {
    this.roleService.getRoleById(id).subscribe({
      next: (res: any) => {
        this.role = res;
        this.selectedPrivileges = this.role.privilegeId;
        this.myForm.patchValue({
          roleTitle: this.role.name,
        });
      },
      error: (err: any) => {
      },
    });
  }

  isSelected(privilege: Privilege): boolean {
    return this.selectedPrivileges.includes(privilege.id);
  }

  onPrivilegeSelect(privilege: Privilege, event: any) {
    if (event.target.checked) {
      this.selectedPrivileges.push(privilege.id);
    } else {
      const index = this.selectedPrivileges.indexOf(privilege.id);
      if (index !== -1) {
        this.selectedPrivileges.splice(index, 1);
      }
    }
  }

  onSubmit() {
    const roleTitle = this.myForm.get('roleTitle')?.value;

    const role = {
      id: this.id,
      name: roleTitle.toUpperCase(),
      privilegeId: this.selectedPrivileges,
    };

    this.roleService.updateRole(role.id, role).subscribe(
      (res: any) => {
        this.router.navigate(['/home/roles']);
      },
      (err: any) => {
      }
    );
  }
}
