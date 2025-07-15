import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models';
import { Jobtype } from 'src/app/core/models/JobTypes/jobtype.model';
import { AlertifyService, LocalStorageService } from 'src/app/core/services';
import { JobtypeService } from 'src/app/core/services/jobtypes/jobtype.service';

@Component({
  selector: 'app-addupdate-jobtype',
  templateUrl: './addupdate-jobtype.component.html',
  styleUrls: ['./addupdate-jobtype.component.scss']
})
export class AddupdateJobtypeComponent implements OnInit, OnChanges  {

  @Input() jobTypeId: number = 0;
  @Input() btnText: string = "Save";
  client: User = new User();
  @Output() response: EventEmitter<boolean> = new EventEmitter();
  model: Jobtype = new Jobtype();
  jobTypeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private _jobTypeService: JobtypeService,
    private _alertify: AlertifyService) { }


    ngOnInit(): void {
    }
    ngOnChanges(): void {
      this.formCreate();
      this.client = LocalStorageService.getUserStorageValue();
      if (this.jobTypeId > 0) {
        this.populateData();
      }
  
    }

    addUpdateJobType(){
      this.model =  this.jobTypeForm.value as Jobtype;
      this.model.JobTypeId =  this.jobTypeId;
      if (this.model.JobTypeId==0) {
        this.model.CreatedBy =  this.client.EmpId;
        this.model.OrgId = this.client.OrgId;
        this._jobTypeService.addJobType(this.model).subscribe(data=>{
          if (data.IsSucceed) {
            this.response.emit(true);
            this._alertify.success("Job Type Added Successfully!");
            this.formCreate();
          }
        },resError=>{            
          this._alertify.error(resError.error.Message);
        });
      }else{
        this.model.LastModifiedBy =  this.client.EmpId;
        this._jobTypeService.updateJobType(this.model).subscribe(data=>{
          if (data.IsSucceed) {
            this.response.emit(true);
            this._alertify.success("Job Type Updated Successfully!");
            this.formCreate();
          }
        },resError=>{            
          this._alertify.error(resError.error.Message);
        });
      }
    }
    populateData() {
      this._jobTypeService.getJobTypeById(this.jobTypeId).subscribe(data => {
        if (data.IsSucceed) {
          this.model = data.Result as Jobtype;
          this.jobTypeForm.patchValue({
            JobTypeId: this.model.JobTypeId,
            JobTypeUid: this.model.JobTypeUid,
            JobTypeName: this.model.JobTypeName,
            IsActive: this.model.IsActive,
          });
        }
      },resError=>{            
        this._alertify.error(resError.error.Message);
      });
    }
    formCreate() {
      this.jobTypeForm = this.formBuilder.group({
        JobTypeId: [0],
        JobTypeUid: ["", [Validators.required]],
        JobTypeName: ["", [Validators.required]],
        IsActive:[true,[]]
      });
    }
    cancel(){
      this.response.emit(true);
    }
}
