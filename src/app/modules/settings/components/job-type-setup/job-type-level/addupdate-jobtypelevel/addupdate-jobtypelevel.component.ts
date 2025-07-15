import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models';
import { JobtypeLevel } from 'src/app/core/models/JobTypes/jobtype-level.model';
import { Jobtype } from 'src/app/core/models/JobTypes/jobtype.model';
import { Gblenv } from 'src/app/core/models/settings/orginfos/gblenv.model';
import { AlertifyService, LocalStorageService } from 'src/app/core/services';
import { JobtypeService } from 'src/app/core/services/jobtypes/jobtype.service';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-addupdate-jobtypelevel',
  templateUrl: './addupdate-jobtypelevel.component.html',
  styleUrls: ['./addupdate-jobtypelevel.component.scss']
})
export class AddupdateJobtypelevelComponent implements OnInit, OnChanges{

  @Input() jobTypeLevelId: number = 0;
  @Input() btnText: string = "Save";
  client: User = new User();
  @Output() response: EventEmitter<boolean> = new EventEmitter();
  model: JobtypeLevel = new JobtypeLevel();
  jobTypeLevelForm: FormGroup;
  jobtypeList: Jobtype[];
  orgList : Gblenv[]=[];
  
  tempOrgList:Gblenv[];
  orgTypeList: any[];
  constructor(private formBuilder: FormBuilder,
    private jobTypeService: JobtypeService,
    private userService: UserService,
    private _alertify: AlertifyService) { }

  ngOnInit(): void {
    this.formCreate();
    this.loadOrgTypeList();
  }

  ngOnChanges(): void {
    this.getJobTypes();
    this.formCreate();
    this.loadOrgTypeList();
    this.client = LocalStorageService.getUserStorageValue();
    if (this.jobTypeLevelId > 0) {
      this.populateData();
    }
  }
  
  loadOrgTypeList(){
    if(this.client.OrgType =="SP"){
      this.orgTypeList = [
        { label: 'SP', value: 'SP' },
        { label: 'Customer', value: 'Customer' },
        { label: 'Hospital', value: 'Hospital' },
        { label: 'Viewer', value: 'Viewer' }
      ];
    }
  
    if(this.client.OrgType =="Customer"){
      this.orgTypeList = [
  
        { label: 'Customer', value: 'Customer' },
        { label: 'Hospital', value: 'Hospital' },
        { label: 'Viewer', value: 'Viewer' }
      ];
    }
  
    
    if(this.client.OrgType =="Hospital"){
      this.orgTypeList = [
        { label: 'Hospital', value: 'Hospital' },
        { label: 'Viewer', value: 'Viewer' }
      ];
    }
    
    if(this.client.OrgType =="Viewer"){
      this.orgTypeList = [
         { label: 'Viewer', value: 'Viewer' }
      ];
    }
  }

  loadOrganizationList(){
    let orgType = this.jobTypeLevelForm.get("OrgType").value;
    this.userService.getAllOrgListByOrgId(this.client.OrgId).subscribe(x=>{
      if (x.IsSucceed) {
        this.tempOrgList = x.Result as Gblenv[];
        // console.log("this.selectedOrgType",this.selectedOrgType);
        
        this.orgList = this.tempOrgList.filter(x => x.OrgType == orgType);
      }
    });
  
  }
  
  populateData(){
    this.jobTypeService.getJobTypeLevelById(this.jobTypeLevelId).subscribe(data => {
      if (data.IsSucceed) {
        this.model = data.Result as JobtypeLevel;
        this.jobTypeLevelForm.patchValue({
          JobTypeId: this.model.JobTypeId,
          JobTypeLevelId: this.model.JobTypeLevelId,
          JobTypeLevelUid: this.model.JobTypeLevelUid,
          JobTypeLevelName: this.model.JobTypeLevelName,
          OrgId : this.model.OrgId,
          IsActive: this.model.IsActive,
        });
      }
    },resError=>{            
      this._alertify.error(resError.error.Message);
    });
  }
  formCreate() {
    this.jobTypeLevelForm = this.formBuilder.group(
      {
        JobTypeLevelId :[0],
        JobTypeId :["",[Validators.required]],
        JobTypeLevelUid :[""],
        JobTypeLevelName :["",[Validators.required]],
        IsActive :[true,[]],
        OrgType:[""],
        OrgId:["",Validators.required]
      });
  }
  addUpdateJobLevel(){
    this.model =  this.jobTypeLevelForm.value as JobtypeLevel;
    if (this.model.JobTypeLevelId==0) {
      this.model.CreatedBy =  this.client.EmpId;
      // this.model.OrgId =  this.client.OrgId;
      this.jobTypeService.addJobTypeLevel(this.model).subscribe(data=>{
        if (data.IsSucceed) {
          this.response.emit(true);
          this._alertify.success("Job Type Level Added Successfully!");
          this.formCreate();
        }
      },resError=>{            
        this._alertify.error(resError.error.Message);
      });
    }else{
      this.model.LastModifiedBy =  this.client.EmpId;
      this.jobTypeService.updateJobTypeLevel(this.model).subscribe(data=>{
        if (data.IsSucceed) {
          this.response.emit(true);
          this._alertify.success("Job Type Level Updated Successfully!");
          this.formCreate();
        }
      },resError=>{            
        this._alertify.error(resError.error.Message);
      });
    }
  }
  cancel(){
    this.response.emit(true);
  }

  getJobTypes() {
    this.jobTypeService.getActiveJobTypes().subscribe(data => {
      if (data.IsSucceed) {
        this.jobtypeList = data.Result as Jobtype[];
        console.log(this.jobtypeList);
      } else {
        this._alertify.error(data.Message);
      }
    }, resError => {
      this._alertify.error(resError.error.Message);
    });
  }

}
