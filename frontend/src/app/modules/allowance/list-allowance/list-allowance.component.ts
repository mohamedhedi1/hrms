import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AllowanceService } from './../../../core/services/allowance.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Allowance } from '../../../core/models/allowance';

@Component({
  selector: 'app-list-allowance',
  templateUrl: './list-allowance.component.html',
  styleUrls: ['./list-allowance.component.css'],
})
export class ListAllowanceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Month',
    'Category',
    'Description',
    'Amount',
    'Action',
  ];
  dataSource!: MatTableDataSource<Allowance>;
  data!: Allowance[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private allService: AllowanceService,
    private formB: FormBuilder
  ) {
    this.allService.listen().subscribe((m:any) => {
      this.loadData();
    })

  }

  ngOnInit() {
    this.loadData();
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
    this.allService.getAllAllowances().subscribe(
      (data: Allowance[]) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
      },
      (error: any) => {
        console.error('Error fetching allowances:', error);
      }
    );
  }

  deleteAllowance(id: string) {
    this.allService.deleteAllowance(id).subscribe((response) => {
      alert('Allowance deleted successfully');
      this.loadData();
    });
  }
}
