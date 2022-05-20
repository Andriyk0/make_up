import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyClubComponent } from './beauty-club.component';

describe('BeautyClubComponent', () => {
  let component: BeautyClubComponent;
  let fixture: ComponentFixture<BeautyClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeautyClubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautyClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
