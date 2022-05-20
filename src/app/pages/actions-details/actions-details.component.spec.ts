import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsDetailsComponent } from './actions-details.component';

describe('ActionsDetailsComponent', () => {
  let component: ActionsDetailsComponent;
  let fixture: ComponentFixture<ActionsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
