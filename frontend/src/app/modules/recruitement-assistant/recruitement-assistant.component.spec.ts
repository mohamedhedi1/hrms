import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitementAssistantComponent } from './recruitement-assistant.component';

describe('RecruitementAssistantComponent', () => {
  let component: RecruitementAssistantComponent;
  let fixture: ComponentFixture<RecruitementAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecruitementAssistantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecruitementAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
