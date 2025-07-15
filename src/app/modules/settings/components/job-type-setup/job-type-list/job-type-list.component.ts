import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models';
import { Jobtype } from 'src/app/core/models/JobTypes/jobtype.model';
import { AlertifyService, LocalStorageService } from 'src/app/core/services';
import { JobtypeService } from 'src/app/core/services/jobtypes/jobtype.service';

@Component({
  selector: 'app-job-type-list',
  templateUrl: './job-type-list.component.html',
  styleUrls: ['./job-type-list.component.scss']
})
export class JobTypeListComponent implements OnInit{

  activityValues: number[] = [0, 100];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  jobtypeList : Jobtype[];
  client : User;
  displayAddUpdatePermissionPopUp : boolean =false;
  btnLabel :string ="Save";
  addUpdatePermissionUpHeader : string ="Add Job Type";
  inputJobTypeId : number =0;
  jobType = new Jobtype();

  constructor(private _jobtypeService:JobtypeService, private _confirmationService: ConfirmationService,private _alertify: AlertifyService){

  }

  ngOnInit(): void {
    this.client = LocalStorageService.getUserStorageValue();
    this.getJobTypes();
   
  }

  getJobTypes(){
    this.loading = true;
    this._jobtypeService.getJobTypes().subscribe(data=>{
      if (data.IsSucceed) {
        this.jobtypeList = data.Result as Jobtype[];
        this.loading = false;
      }else{
        this._alertify.error(data.Message);
      }
    },resError=>{            
      this._alertify.error(resError.error.Message);
    });
  }

  addUpdateJobType(JobTypeId:number) {
    
    try {      
      this.displayAddUpdatePermissionPopUp = true; 
      if (JobTypeId>0) {
        this.btnLabel = "Update";
        this.addUpdatePermissionUpHeader = 'Update Job Type';
      }else {
        this.btnLabel = "Save";
        this.addUpdatePermissionUpHeader = 'Add Job Type';
      }    
      this.inputJobTypeId =  JobTypeId;
      //Reactive Form Controls
      // this.initializeUserForm();

    } catch (error) {
      throw error;
    }
   
  }

  deleteJobtype(JobTypeId:number){
    this.jobType.JobTypeId = JobTypeId;
    this.jobType.LastModifiedBy = this.client.EmpId;
    this._confirmationService.confirm({
      key: "DeleteJobType",
      message: "Do you want to delete?",
      accept: () => {
        this._jobtypeService.deleteJobType(this.jobType).subscribe(
          data=>{
            console.log("data",data);
            if (data.IsSucceed) {
              this._alertify.success("Job type Deleted Successfully.");
             this.getJobTypes();
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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
close(){   
   
}
reload(check){
  if (check) {
    this.getJobTypes();
    this.displayAddUpdatePermissionPopUp = false;
    // this.approvebtn = false;
  }
}
}
