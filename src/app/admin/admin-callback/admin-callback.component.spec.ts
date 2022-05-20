import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCallbackComponent } from './admin-callback.component';

describe('AdminCallbackComponent', () => {
  let component: AdminCallbackComponent;
  let fixture: ComponentFixture<AdminCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
