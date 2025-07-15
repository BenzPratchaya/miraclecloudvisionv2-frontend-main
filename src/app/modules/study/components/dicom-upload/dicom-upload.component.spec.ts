import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomUploadComponent } from './dicom-upload.component';

describe('DicomUploadComponent', () => {
  let component: DicomUploadComponent;
  let fixture: ComponentFixture<DicomUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DicomUploadComponent]
    });
    fixture = TestBed.createComponent(DicomUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
