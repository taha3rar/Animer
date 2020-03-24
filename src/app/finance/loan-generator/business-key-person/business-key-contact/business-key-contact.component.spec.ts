import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessKeyContactComponent } from './business-key-contact.component';

describe('BusinessKeyContactComponent', () => {
  let component: BusinessKeyContactComponent;
  let fixture: ComponentFixture<BusinessKeyContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessKeyContactComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessKeyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
