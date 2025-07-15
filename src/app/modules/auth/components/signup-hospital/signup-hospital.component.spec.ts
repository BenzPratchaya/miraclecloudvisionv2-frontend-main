import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupHospitalComponent } from './signup-hospital.component';

describe('SignupHospitalComponent', () => {
  let component: SignupHospitalComponent;
  let fixture: ComponentFixture<SignupHospitalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupHospitalComponent]
    });
    fixture = TestBed.createComponent(SignupHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
