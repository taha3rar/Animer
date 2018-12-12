import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActivityPanelComponent } from './dashboard-activity-panel.component';

describe('DashboardActivityPanelComponent', () => {
  let component: DashboardActivityPanelComponent;
  let fixture: ComponentFixture<DashboardActivityPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardActivityPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardActivityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
