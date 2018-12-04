import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { ActivatedRoute, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientListComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
