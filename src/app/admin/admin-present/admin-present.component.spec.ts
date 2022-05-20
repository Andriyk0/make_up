import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPresentComponent } from './admin-present.component';

describe('AdminPresentComponent', () => {
  let component: AdminPresentComponent;
  let fixture: ComponentFixture<AdminPresentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPresentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
