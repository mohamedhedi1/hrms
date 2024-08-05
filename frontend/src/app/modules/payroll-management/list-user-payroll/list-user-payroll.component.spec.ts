import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserPayrollComponent } from './list-user-payroll.component';

describe('ListUserPayrollComponent', () => {
  let component: ListUserPayrollComponent;
  let fixture: ComponentFixture<ListUserPayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUserPayrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUserPayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
