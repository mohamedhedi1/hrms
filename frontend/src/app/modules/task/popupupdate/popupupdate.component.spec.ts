import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupupdateComponent } from './popupupdate.component';

describe('PopupupdateComponent', () => {
  let component: PopupupdateComponent;
  let fixture: ComponentFixture<PopupupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
