import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Allowance } from '../../../core/models/allowance';
import { AllowanceService } from '../../../core/services/allowance.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/User';

@Component({
  selector: 'app-add-allowance',
  templateUrl: './add-allowance.component.html',
  styleUrls: ['./add-allowance.component.css'],
})
export class AddAllowanceComponent implements OnInit {

  allowance: Allowance = new Allowance();
  allUsers: User[] = [];
  categories: any[] = [
    'FOOD',
    'TRANSPORTATION',
    'LODGING',
    'ENTERTAINMENT',
    'MISCELLANEOUS',
  ];

  constructor(
    private allowanceService: AllowanceService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.allUsers = users;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  add(form: NgForm) {
    if (form.valid) {
      const allowance: Allowance = {
        id: '',
        userId: form.value.user,
        description: form.value.description,
        category: form.value.category,
        amount: form.value.amount,
        date: new Date().toISOString().toString(),
      };
      this.allowanceService.createAllowance(allowance).subscribe(
        () => {
          alert('Allowance added successfully!');
          this.allowanceService.filter('RegisterClick')
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
