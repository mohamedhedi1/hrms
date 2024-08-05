import { Component, OnInit } from '@angular/core';
import { Payroll } from '../../../core/models/payroll';
import { PayrollService } from '../../../core/services/payroll.service';

@Component({
  selector: 'app-list-user-payroll',
  templateUrl: './list-user-payroll.component.html',
  styleUrl: './list-user-payroll.component.css',
})
export class ListUserPayrollComponent implements OnInit {
  data!: Payroll[];
  id!: any;
  constructor(private payrollService: PayrollService) {}

  ngOnInit() {
    let p = localStorage.getItem('user');
    if (p) {
      let email = JSON.parse(p)['email'];
      this.payrollService.getUserIdByEmail(email).subscribe((data) => {
        this.id = data.id;
        this.getDataByUser(this.id);
      });
    }
  }

  public getDataByUser(id: string) {
    this.payrollService.getPayrollsByUserId(id).subscribe((data) => {
      this.data = data;
    });
  }

  print(payroll: Payroll) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Payroll Details</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
              }
              th {
                background-color: #f2f2f2;
              }
            </style>
          </head>
          <body>
            <h2>Payroll Details</h2>
            <table>
              <tr>
                <th>Attribute</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>User ID</td>
                <td>${payroll.userId}</td>
              </tr>
              <tr>
                <td>Month</td>
                <td>${new Date(payroll.month).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td>Taxable Salary</td>
                <td>${payroll.taxableSalary}</td>
              </tr>
              <tr>
                <td>CNSS Deduction</td>
                <td>${payroll.cnssdeduction}</td>
              </tr>
              <tr>
                <td>IRPP</td>
                <td>${payroll.irpp}</td>
              </tr>
              <tr>
                <td>CSS</td>
                <td>${payroll.css}</td>
              </tr>
              <tr>
                <td>Net Salary</td>
                <td>${payroll.netSalary}</td>
              </tr>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Failed to open print window.');
    }
  }
}
