import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models';
import { JobtypeLevel } from 'src/app/core/models/JobTypes/jobtype-level.model';
import { JobtypePermission } from 'src/app/core/models/JobTypes/jobtype-permission.model';
import { Jobtype } from 'src/app/core/models/JobTypes/jobtype.model';
import { AlertifyService, LocalStorageService } from 'src/app/core/services';
import { JobtypeService } from 'src/app/core/services/jobtypes/jobtype.service';

@Component({
  selector: 'app-addupdate-jobtypepermission',
  templateUrl: './addupdate-jobtypepermission.component.html',
  styleUrls: ['./addupdate-jobtypepermission.component.scss']
})
export class AddupdateJobtypepermissionComponent implements OnInit,OnChanges  {
  @Input() permissionId : number = 0;
  @Input() btnText : string= "Save";
  @Output() response : EventEmitter<boolean> =  new EventEmitter();
  jobTypeForm:FormGroup;
  jobTypePermission:JobtypePermission;
  client: User = new User();
  jobTypeLevelList : JobtypeLevel[];
  jobTypeList : Jobtype[];
  isResetEnable : boolean = true;
  constructor(private formBuilder: FormBuilder,
              private jobTypeService: JobtypeService,
              private _alertify: AlertifyService) { }

              ngOnInit(): void {
                this.getJobtypeList();
                this.getJobTypeLevelByJobTypeId();
                this.formcreate();
               
              }
              ngOnChanges(){
              this.client = LocalStorageService.getUserStorageValue();
              this.getJobtypeList();
              // this.jobTypeForm.reset();
              this.formcreate();
              if (this.permissionId>0) {
                this.populatedata();
              }
            }
            addUpdateJobTypePermission(){
              this.jobTypePermission = this.jobTypeForm.value as JobtypePermission;
              if (this.jobTypePermission.JobTypePermissionId==0) {
                this.jobTypePermission.OrgId = this.client.OrgId;
                this.jobTypePermission.CreatedBy = this.client.EmpId;
                this.jobTypeService.addJobTypePermission(this.jobTypePermission).subscribe(
                  data=>{
                    if (data.IsSucceed) {
                      this._alertify.success("Job type Permission Added Successfully.");
                      this.response.emit(true);
                      this.formcreate();
                    }
                  },resError=>{            
                    this._alertify.error(resError.error.Message);
                  }
                );
              }else{
              this.jobTypePermission.LastModifiedBy = this.client.EmpId;
              this.jobTypeService.updateJobTypePermission(this.jobTypePermission).subscribe(
                data=>{
                  if (data.IsSucceed) {
                    this._alertify.success("Job type Permission Updated Successfully.");
                    this.response.emit(true);
                    this.formcreate();
                  }
                },resError=>{            
                  this._alertify.error(resError.error.Message);
                }
              );
              }
            
              // console.log(this.jobTypePermission);
            }
            cancel(){
              this.response.emit(true);
            }
            populatedata(){
              this.jobTypeService.getJobTypePermissionById(this.permissionId).subscribe(
                data=>{
                  if (data.IsSucceed) {
                    this.jobTypePermission = data.Result as JobtypePermission
                    // console.log(this.jobTypePermission);
                    // alert(this.jobTypePermission.JobTypeId);
                    this.getJobTypeLevelByJobTypeId(this.jobTypePermission.JobTypeId);
                      this.jobTypeForm.patchValue(
                        {
                          JobTypePermissionId : this.jobTypePermission.JobTypePermissionId,
                          JobTypeId : this.jobTypePermission.JobTypeId,
                          JobTypeLevelId : this.jobTypePermission.JobTypeLevelId,
                          StudyAssignAllow : this.jobTypePermission.StudyAssignAllow,
                          StudyAssignAllowOthers : this.jobTypePermission.StudyAssignAllowOthers,
                          StudyUnAssignAllow : this.jobTypePermission.StudyUnAssignAllow,
                          StudyUnAssignAllowOthers : this.jobTypePermission.StudyUnAssignAllowOthers,
                          StudyDraftAllow : this.jobTypePermission.StudyDraftAllow,
                          StudyFinalizeAllow : this.jobTypePermission.StudyFinalizeAllow,
                          StudyAddendumAllow : this.jobTypePermission.StudyAddendumAllow,
                          StudyResetAllow : this.jobTypePermission.StudyResetAllow,
                          StudyResetAllowOthers : this.jobTypePermission.StudyResetAllowOthers,
                          StudyResetWindowHour : this.jobTypePermission.StudyResetWindowHour,
                          IsActive : this.jobTypePermission.IsActive,
                        }
                      );
                    
                  }
                }
              );
             
            }
            getJobtypeList(){
              this.jobTypeService.getActiveJobTypes().subscribe(
                data=>{
                  if (data.IsSucceed) {
                    this.jobTypeList =  data.Result as Jobtype[];
                    // console.log(this.jobTypeList);
                  }
                }
              );
            }
            
            getJobTypeLevelByJobTypeId(filterid? : number){
             
            let jobtypeid = this.jobTypeForm.get("JobTypeId").value;
            if (filterid) {
              jobtypeid = filterid;
            }
            this.jobTypeService.getActiveJobTypeLevels(jobtypeid).subscribe(
              data=>{
                if (data.IsSucceed) {
                  this.jobTypeLevelList =  data.Result as JobtypeLevel[];
                  console.log(this.jobTypeLevelList);
                  if(this.jobTypeLevelList.length>0){       
                    this.mandatoryJobTypeLevel();
                  }else{
                    this.notMandatoryJobTypeLevel();
                  }
                }
              }
            );
            }
            mandatoryJobTypeLevel(){
              this.jobTypeForm.get('JobTypeLevelId').setValidators([Validators.required]);
              this.jobTypeForm.get('JobTypeLevelId').updateValueAndValidity();
            }
            notMandatoryJobTypeLevel(){
              this.jobTypeForm.get('JobTypeLevelId').setValidators([]);
              this.jobTypeForm.get('JobTypeLevelId').updateValueAndValidity();
            }
            showResetHour(){
              // alert('studyaddendum');
              if (this.jobTypeForm.get('StudyResetAllowOthers').value || this.jobTypeForm.get('StudyResetAllow').value) {
                this.isResetEnable = false;
              }else{
                this.isResetEnable = true;
              }
            }
            studyaddendum(){
              // alert('studyaddendum');
              if (this.jobTypeForm.get('StudyFinalizeAllow').value) {
                this.jobTypeForm.get('StudyAddendumAllow').patchValue(true);
              }else{
                this.jobTypeForm.get('StudyAddendumAllow').patchValue(false);
              }
            }
              formcreate(){
                this.jobTypeForm =  this.formBuilder.group(
                {
                  JobTypePermissionId : [0],
                  JobTypeId :["",[Validators.required]],
                  JobTypeLevelId : [],
                  StudyAssignAllow:[false],
                  StudyAssignAllowOthers:[false],
                  StudyUnAssignAllow:[false],
                  StudyUnAssignAllowOthers:[false],
                  StudyDraftAllow:[true],
                  StudyFinalizeAllow:[true],
                  StudyAddendumAllow:[true],
                  StudyResetAllow:[false],
                  StudyResetAllowOthers:[false],
                  IsActive:[true],
                  StudyResetWindowHour:[24,[Validators.pattern("^[0-9]*$")]]
                });
              }
            
            }
            