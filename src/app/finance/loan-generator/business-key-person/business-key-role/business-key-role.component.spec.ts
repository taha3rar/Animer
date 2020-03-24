import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessKeyRoleComponent } from './business-key-role.component';

describe('BusinessKeyRoleComponent', () => {
  let component: BusinessKeyRoleComponent;
  let fixture: ComponentFixture<BusinessKeyRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessKeyRoleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessKeyRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
