import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAllowanceComponent } from './update-allowance.component';

describe('UpdateAllowanceComponent', () => {
  let component: UpdateAllowanceComponent;
  let fixture: ComponentFixture<UpdateAllowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAllowanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
