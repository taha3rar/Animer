import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCounterPanelComponent } from './dashboard-counter-panel.component';

describe('DashboardCounterPanelComponent', () => {
  let component: DashboardCounterPanelComponent;
  let fixture: ComponentFixture<DashboardCounterPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCounterPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCounterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
