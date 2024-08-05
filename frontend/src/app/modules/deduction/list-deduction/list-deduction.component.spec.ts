import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeductionComponent } from './list-deduction.component';

describe('ListDeductionComponent', () => {
  let component: ListDeductionComponent;
  let fixture: ComponentFixture<ListDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDeductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
