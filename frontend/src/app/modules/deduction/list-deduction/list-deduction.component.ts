import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Deduction } from '../../../core/models/deduction';
import { DeductionService } from '../../../core/services/deduction.service';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-list-deduction',
  templateUrl: './list-deduction.component.html',
  styleUrl: './list-deduction.component.css',
})
export class ListDeductionComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Month',
    'Description',
    'Amount',
    'Action',
  ];
  dataSource!: MatTableDataSource<Deduction>;
  data!: Deduction[];
  selectedConfig: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private dedService: DeductionService,
    private formB: FormBuilder,
    private deductionService: DeductionService,
    private userService: UserService
  ) {
    this.dedService.listen().subscribe((m: any) => {
      this.loadData();
    });
  }

  ngOnInit() {
    this.loadData();
    this.loadAllUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData() {
    this.dedService.getAllDeductions().subscribe(
      (data: Deduction[]) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
      },
      (error: any) => {
        console.error('Error fetching deductions:', error);
      }
    );
  }

  deleteDeduction(id: string) {
    this.dedService.deleteDeduction(id).subscribe((response) => {
      alert('Deduction deleted successfully');
      this.loadData();
    });
  }
  deduction: Deduction = new Deduction();
  allUsers: User[] = [];
  categories: any[] = [
    'FOOD',
    'TRANSPORTATION',
    'LODGING',
    'ENTERTAINMENT',
    'MISCELLANEOUS',
  ];

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
      const deduction: Deduction = {
        id: '',
        userId: form.value.user,
        description: form.value.description,
        amount: form.value.amount,
        date: new Date().toISOString().toString(),
      };
      this.deductionService.createDeduction(deduction).subscribe(
        () => {
          alert('Deduction added successfully!');
          this.deductionService.filter('RegisterClick');
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
