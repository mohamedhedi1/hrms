import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAttendanceComponent } from './create-attendance.component';
import { AttendanceTrackingService } from '../../../core/services/attendance-tracking.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Status, ShiftType } from '../../../core/models/attendanceRecord';
import { User } from '../../../core/models/User';

describe('CreateAttendanceComponent', () => {
  let component: CreateAttendanceComponent;
  let fixture: ComponentFixture<CreateAttendanceComponent>;
  let attendanceService: AttendanceTrackingService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAttendanceComponent],
      providers: [AttendanceTrackingService, MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttendanceComponent);
    component = fixture.componentInstance;
    attendanceService = TestBed.inject(AttendanceTrackingService);
    messageService = TestBed.inject(MessageService);

    spyOn(attendanceService, 'getUserIdByEmail').and.returnValue(
      of({ id: 'someId' })
    );
    spyOn(
      attendanceService,
      'getTotalHalfShiftDaysForUserInMonth'
    ).and.returnValue(
      of({
        halfShifts: 5,
        fullShifts: 10,
        quarterShifts: 3,
        absences: 2,
      })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show warning toast', () => {
    const message = 'Test Warning Message';
    const spyAdd = spyOn(messageService, 'add').and.callThrough();

    component.showWarningToast(message);

    expect(spyAdd).toHaveBeenCalledWith({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 5000,
      styleClass: 'custom-toast',
    });
  });

  it('should show success toast', () => {
    const spyAdd = spyOn(messageService, 'add').and.callThrough();

    component.showSuccessToast();

    expect(spyAdd).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully submitted your attendance!',
      life: 5000,
      styleClass: 'custom-toast',
    });
  });

  it('should submit form', () => {
    const formData = {
      status: Status.PRESENT,
      shiftType: ShiftType.FULL_DAY,
      absent_reason: 'Sick',
      id: '',
      date: '2024-05-02',
      userId: 'someId',
    };

    spyOn(attendanceService, 'create').and.returnValue(of({}));

    component.submitForm();

    expect(attendanceService.create).toHaveBeenCalledWith('someId', formData);
  });
});
