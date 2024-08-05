import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/Role';
import { EncryptionService } from '../../../core/services/encryption.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  myForm: FormGroup;
  roles: Role[] = [];
  selectedRole: Role[] = [];
  onroleSelect(role: Role, event: any) {
    if (event.target.checked) {
      this.selectedRole.push(role);
    } else {
      const index = this.selectedRole.indexOf(role);
      if (index !== -1) {
        this.selectedRole.splice(index, 1);
      }
    }
    
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private roleService: RoleService,
    private encryptionService: EncryptionService
  ) {
    this.getRoles();
    this.myForm = this.fb.group({
      firstname: ['', [Validators.pattern('[A-Za-z]+'), Validators.required]],
      lastname: ['', [Validators.pattern('[A-Za-z]+'), Validators.required]],
      email: ['', [Validators.email]],
      job: ['', [Validators.pattern('[A-Za-z ]*')]],
      number: ['', [Validators.pattern('^[0-9]{8}$')]],
      address: ['', [Validators.required]],
      birthday: ['', [this.dateNaissanceValidator(18)]],
      degree: ['', [Validators.required]],

      basicSalary : ['',[Validators.pattern('^[0-9]+$')]],
      offDays : ['',[Validators.pattern('^[0-9]+$')]],
      familySituation : ['',[Validators.pattern('^[0-9]+$')]],
      childrenNumber : ['',[Validators.pattern('^[0-9]+$')]],
      bankrib :['',[Validators.pattern('^[0-9]+$')]],
      numCnss : ['',[Validators.pattern('^[0-9]+$')]],
      cin : ['',[Validators.pattern('^[0-9]+$')]]

    });
  }
  dateNaissanceValidator(minYears: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputDate = new Date(control.value);
      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - minYears);

      if (inputDate >= currentDate) {
        return { dateNaissanceInvalid: { value: control.value } };
      }

      return null;
    };
  }
  getRoles() {
    this.roleService.getRoles().subscribe({
      next: (res: Role[]) => {
     
        this.roles = res;
      },
      error: (err) => {
        
      },
    });
  }
  onSubmit() {
    const user = this.myForm.value;
    const roles: Role[] = this.selectedRole;

    const transformedRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
    }));
   
    user.roles = this.selectedRole;
    user.password = 'password';
    this.userService.addUser(user).subscribe(
      (response) => {
        const authoritiesCrypted = localStorage.getItem('authorities');
        const authorities = this.encryptionService.decrypt(
          authoritiesCrypted!,
          '2f7'
        );
        if (authorities.includes('READ::USER'))
          this.router.navigate(['/home/users']);
        else this.router.navigate(['/home']);
      },
      (error) => {
      }
    );

    this.myForm.reset();
  }
}
