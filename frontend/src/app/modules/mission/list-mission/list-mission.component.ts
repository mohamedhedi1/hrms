import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MissionService } from './../../../core/services/mission.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Mission } from '../../../core/models/mission';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-list-mission',
  templateUrl: './list-mission.component.html',
  styleUrls: ['./list-mission.component.css'],
})
export class ListMissionComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'title',
    'description',
    'startDate',
    'endDate',
    'status',
    'client',
    'action',
  ];
  dataSource!: MatTableDataSource<Mission>;
  data!: Mission[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private missionService: MissionService,
    private formB: FormBuilder,
    private route: Router,
    private userService: UserService
  ) {
    this.missionService.listen().subscribe((m: any) => {
      this.loadData();
    });
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
    this.missionService.getAllMissions().subscribe(
      (data: Mission[]) => {
        this.data = data;
        this.data.forEach((mission) => {
          if (mission.client) {
            this.userService.getUserById(mission.client).subscribe(
              (user: any) => {
                mission.clientFirstName = user.firstname;
                mission.clientLastName = user.lastname;
              },
              (error: any) => {
                console.error(
                  `Error fetching client details for mission ${mission.id}:`,
                  error
                );
              }
            );
          }
        });
        this.dataSource = new MatTableDataSource(this.data);
      },
      (error: any) => {
        console.error('Error fetching missions:', error);
      }
    );
  }

  deleteMission(id: string) {
    this.missionService.deleteMission(id).subscribe((response) => {
      alert('Mission deleted successfully');
      this.loadData();
    });
  }
}
