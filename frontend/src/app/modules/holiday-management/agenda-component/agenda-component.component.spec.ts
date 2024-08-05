import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaComponentComponent } from './agenda-component.component';

describe('AgendaComponentComponent', () => {
  let component: AgendaComponentComponent;
  let fixture: ComponentFixture<AgendaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
