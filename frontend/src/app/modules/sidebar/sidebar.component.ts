import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../../core/services/encryption.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  visibiliyRoleManagment = false;
  roleManagment = false;
  displayRoleList = false;
  displayRoleAdd = false;
  toggleDropdownRole() {
    this.roleManagment = !this.roleManagment;
  }

  visibiliyEmployeeManagment = false;
  EmployeeManagment = false;
  displayEmployeeList = false;
  displayEmployeeAdd = false;
  toggleDropdownEmployee() {
    this.EmployeeManagment = !this.EmployeeManagment;
  }

  visibiliyAttendanceManagment = false;
  AttendanceManagment = false;
  displayAttendanceList = false;
  displayAttendanceAdd = false;
  displayAttendanceUpdate = false;
  displayAttendanceCreate = false;

  toggleDropdownAttendance() {
    this.AttendanceManagment = !this.AttendanceManagment;
  }

  visibiliyProjectManagment = false;
  ProjectManagment = false;
  displayProjectList = false;

  visibiliyHolidayManagment = false;
  visibiliyTaskManagment = false;

  visibiliyConfigManagment = false;
  visibiliyPayrollManagment = false;
  visibiliyMissionManagment = false;

  constructor(private encryptionService: EncryptionService) {}

  ngOnInit(): void {
    const authoritiesCrypted = localStorage.getItem('authorities');
    const authorities = this.encryptionService.decrypt(
      authoritiesCrypted!,
      '2f7'
    );
    

    if (authorities.includes('PAYROLL')) {
      this.visibiliyPayrollManagment = true;
    }
    if (authorities.includes('MISSION')) {
      this.visibiliyMissionManagment = true;
    }
    if (authorities.includes('CONFIG')) {
      this.visibiliyConfigManagment = true;
    }

    if (authorities.includes('PROJECT')) {
      this.visibiliyProjectManagment = true;
    }
    if (authorities.includes('TASK')) {
      this.visibiliyTaskManagment = true;
    }

    if (authorities.includes('HOLIDAY')) {
      this.visibiliyHolidayManagment = true;
    }

    if (authorities.includes('ATTENDANCE')) {
      this.visibiliyAttendanceManagment = true;
    }
    if (authorities.includes('READ::ATTENDANCE')) {
      this.displayAttendanceList = true;
    }
    if (authorities.includes('ADD::ATTENDANCE')) {
      this.displayAttendanceAdd = true;
    }
    if (authorities.includes('EDIT::ATTENDANCE')) {
      this.displayAttendanceUpdate = true;
    }
    if (authorities.includes('CREATE::ATTENDANCE')) {
      this.displayAttendanceCreate = true;
    }

    if (authorities.includes('ROLE')) {
      this.visibiliyRoleManagment = true;
    }
    if (authorities.includes('READ::ROLE')) {
      this.displayRoleList = true;
    }
    if (authorities.includes('ADD::ROLE')) {
      this.displayRoleAdd = true;
    }

    if (authorities.includes('USER')) {
      this.visibiliyEmployeeManagment = true;
    }
    if (authorities.includes('READ::USER')) {
      this.displayEmployeeList = true;
    }
    if (authorities.includes('ADD::USER')) {
      this.displayEmployeeAdd = true;
    }
  }

  getPrivileges() {}
}
