import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWelcomePanelComponent } from './dashboard-welcome-panel.component';

describe('DashboardWelcomePanelComponent', () => {
  let component: DashboardWelcomePanelComponent;
  let fixture: ComponentFixture<DashboardWelcomePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardWelcomePanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardWelcomePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
