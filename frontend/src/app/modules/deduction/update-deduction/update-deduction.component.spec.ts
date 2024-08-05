import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeductionComponent } from './update-deduction.component';

describe('UpdateDeductionComponent', () => {
  let component: UpdateDeductionComponent;
  let fixture: ComponentFixture<UpdateDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDeductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
