import { Component, OnInit } from '@angular/core';
import { PrivilegeService } from '../../../core/services/privilege.service';
import { RoleService } from '../../../core/services/role.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Privilege } from '../../../core/models/Privilege';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../core/services/encryption.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  myForm: FormGroup;
  privileges: Privilege[] = [];
  selectedPrivileges: Privilege[] = [];

  constructor(
    private privilegeService: PrivilegeService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private router: Router,
    private encryptionService: EncryptionService
  ) {
    this.myForm = this.formBuilder.group({
      roleTitle: ['', [Validators.pattern('[a-zA-Z]+'), Validators.required]],
    });
  }

  onprivilegeSelect(privilege: Privilege, event: any) {
    if (event.target.checked) {
      this.selectedPrivileges.push(privilege);
    } else {
      const index = this.selectedPrivileges.indexOf(privilege);
      if (index !== -1) {
        this.selectedPrivileges.splice(index, 1);
      }
    }
  }

  ngOnInit(): void {
    this.getPrivileges();
  }

  getPrivileges() {
    this.privilegeService.getPrivileges().subscribe(
      (res: any[]) => {
        this.privileges = res;
      },
      (err: any) => {
      }
    );
  }

  onSubmit() {
    const roleTitle = this.myForm.get('roleTitle')?.value;
    const selectedPrivilegesIds = this.selectedPrivileges.map(
      (privilege) => privilege.id
    );
    const role = {
      name: roleTitle.toUpperCase(),
      privileges: selectedPrivilegesIds,
    };

    this.roleService.addRole(role).subscribe(
      (res: any) => {
        const authoritiesCrypted = localStorage.getItem('authorities');
        const authorities = this.encryptionService.decrypt(
          authoritiesCrypted!,
          '2f7'
        );
        if (authorities.includes('READ::ROLE'))
          this.router.navigate(['/home/roles']);
        else this.router.navigate(['/home']);
      },
      (err: any) => {
      }
    );
  }
}
