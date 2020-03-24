import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessKeyDetailsComponent } from './business-key-details.component';

describe('BusinessKeyDetailsComponent', () => {
  let component: BusinessKeyDetailsComponent;
  let fixture: ComponentFixture<BusinessKeyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessKeyDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessKeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
