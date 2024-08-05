import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProjectManagementService } from '../core/services/projectManagement.service';
import { Project, ProjectStatus } from '../core/models/project';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs';
import { PayrollService } from '../core/services/payroll.service';
import { TaskService } from '../core/services/task-service';
import { UserService } from '../core/services/user.service';
import { AttendanceTrackingService } from '../core/services/attendance-tracking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
  title = 'ng-chart';
  chart: any = [];
  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('radarChart') radarChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;

  projects!: Project[];
  todo!: Project[];
  done!: Project[];
  finished!: Project[];
  numProjectsTodo!: number;
  numProjectsDone!: number;
  numProjectsFinished!: number;
  netSalariesByMonth: number[] = [];
  tasksNumber = 0;
  employeesNumber = 0;
  constructor(
    private projectService: ProjectManagementService,
    private payrollService: PayrollService,
    private taskService: TaskService,
    private userService: AttendanceTrackingService
  ) {}

  ngAfterViewInit() {
    this.projectService.getAllProjects().subscribe((allProjects) => {
      this.projects = allProjects;
      this.todo = this.projects.filter(
        (project) => project.projectStatus === 'ON_HOLD'
      );
      this.done = this.projects.filter(
        (project) => project.projectStatus === 'RUNNING'
      );
      this.finished = this.projects.filter(
        (project) => project.projectStatus === 'FINISHED'
      );
      this.numProjectsTodo = this.todo.length;
      this.numProjectsDone = this.done.length;
      this.numProjectsFinished = this.finished.length;
      this.creatPiechart(
        this.todo.length,
        this.done.length,
        this.finished.length
      );
    });
    this.taskService.getAll().subscribe((data) => {
      this.tasksNumber = data.length;
    });
    this.userService.findAllUsers().subscribe((data) => {
      this.employeesNumber = data.length;
    });
    this.calculateNetSalariesForAllMonths();
    new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'red',
              'blue',
              'yellow',
              'green',
              'purple',
              'orange',
            ],
          },
        ],
      },
    });

    // Line Chart

    // Radar Chart
    new Chart(this.radarChartRef.nativeElement, {
      type: 'radar',
      data: {
        labels: [
          'Eating',
          'Drinking',
          'Sleeping',
          'Designing',
          'Coding',
          'Cycling',
          'Running',
        ],
        datasets: [
          {
            label: 'My Data',
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      },
    });

    // Pie Chart
  }

  creatPiechart(t: any, d: any, f: any) {
    new Chart(this.pieChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Todo', 'Done', 'Finished'],
        datasets: [
          {
            label: '# of Votes',
            data: [Number(t), Number(d), Number(f)],
            backgroundColor: ['orange', 'red', 'green'],
          },
        ],
      },
    });
  }
  calculateNetSalariesForAllMonths() {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const observables: Observable<any>[] = [];

    months.forEach((month) => {
      observables.push(
        this.payrollService.getPayrollsByMonth('2024-' + month.toString())
      );
    });

    forkJoin(observables)
      .pipe(
        map((results) => {
          this.netSalariesByMonth = results.map((payrolls: any[]) =>
            payrolls.reduce(
              (total: number, payroll: any) => total + payroll.netSalary,
              0
            )
          );
          this.createLinechart();
        })
      )
      .subscribe();
  }

  createLinechart() {
    new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        datasets: [
          {
            label: 'Net Salaries',
            data: this.netSalariesByMonth,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });
  }
}
