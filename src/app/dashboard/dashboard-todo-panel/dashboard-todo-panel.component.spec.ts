import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTodoPanelComponent } from './dashboard-todo-panel.component';

describe('DashboardTodoPanelComponent', () => {
  let component: DashboardTodoPanelComponent;
  let fixture: ComponentFixture<DashboardTodoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTodoPanelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTodoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
