import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models';
import { JobtypeLevel } from 'src/app/core/models/JobTypes/jobtype-level.model';
import { AlertifyService, LocalStorageService } from 'src/app/core/services';
import { JobtypeService } from 'src/app/core/services/jobtypes/jobtype.service';

@Component({
  selector: 'app-job-type-level',
  templateUrl: './job-type-level.component.html',
  styleUrls: ['./job-type-level.component.scss']
})
export class JobTypeLevelComponent implements OnInit {
  activityValues: number[] = [0, 100];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  jobtypeLevelList : JobtypeLevel[];
  jobtypeLevel : JobtypeLevel = new JobtypeLevel();
  client : User;
  displayAddUpdateLevelPopUp : boolean =false;
  addUpdateLevelUpHeader : string ="Add Job Type Level";
  inputJobTypeLevelId : number =0;
  btnLabel :string ="Save";

  constructor(private _jobtypeService:JobtypeService,private _alertify: AlertifyService,private _confirmationService: ConfirmationService){

  }
  ngOnInit(): void {
    this.client = LocalStorageService.getUserStorageValue();
    this.getJobTypeLevels();
  }

  getJobTypeLevels(){
    this.loading = true;
    this._jobtypeService.getJobTypeLevelList().subscribe(data=>{
      if (data.IsSucceed) {
        this.jobtypeLevelList = data.Result as JobtypeLevel[];
        this.loading = false;
      }else{
        this._alertify.error(data.Message);
      }
    },resError=>{            
      this._alertify.error(resError.error.Message);
    });
  }
  addUpdateJobTypeLevel(JobTypeLevelId:number) {
    
    try {      
      this.displayAddUpdateLevelPopUp = true; 
      if (JobTypeLevelId>0) {
        this.btnLabel = "Update";
        this.addUpdateLevelUpHeader = 'Update Job Type Level';
      }else {
        this.btnLabel = "Save";
        this.addUpdateLevelUpHeader = 'Add Job Type Level';
      }    
      this.inputJobTypeLevelId =  JobTypeLevelId;
      //Reactive Form Controls
      // this.initializeUserForm();

    } catch (error) {
      throw error;
    }
   
  }
  deleteJobtypeLevel(JobTypeId:number){
    this.jobtypeLevel.JobTypeLevelId = JobTypeId;
    this.jobtypeLevel.LastModifiedBy = this.client.EmpId;
    this._confirmationService.confirm({
      key: "DeleteJobTypeLevel",
      message: "Do you want to delete?",
      accept: () => {
        this._jobtypeService.deleteJobTypeLevel(this.jobtypeLevel).subscribe(
          data=>{
            console.log("data",data);
            if (data.IsSucceed) {
              this._alertify.success("Job type Level Deleted Successfully.");
             this.getJobTypeLevels();
            }else{
              this._alertify.success(data.Message);
            }
          },resError=>{            
            this._alertify.error(resError.error.Message);
          }
        );
      },
      reject: () => {
        // console.log("finalize Rejected");
        return;
      },
    });

  }
  close(){   
   
  }
  reload(check){
    if (check) {
      this.getJobTypeLevels();
      this.displayAddUpdateLevelPopUp = false;
      // this.approvebtn = false;
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
}
