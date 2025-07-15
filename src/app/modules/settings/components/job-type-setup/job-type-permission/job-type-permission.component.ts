import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models';
import { JobtypePermission } from 'src/app/core/models/JobTypes/jobtype-permission.model';
import { AlertifyService, LocalStorageService } from 'src/app/core/services';
import { JobtypeService } from 'src/app/core/services/jobtypes/jobtype.service';

@Component({
  selector: 'app-job-type-permission',
  templateUrl: './job-type-permission.component.html',
  styleUrls: ['./job-type-permission.component.scss']
})
export class JobTypePermissionComponent implements OnInit {


  activityValues: number[] = [0, 100];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  client : User;
  displayAddUpdatePermissionPopUp : boolean =false;
  addUpdatePermissionUpHeader : string ="Add Job Type Permission";
  inputPermissionId : number =0;
  btnLabel :string ="Save"
  jobTypePermission = new JobtypePermission();

  jobtypesPermission : JobtypePermission[];
  constructor(private _jobtypeService:JobtypeService,
    private _alertify: AlertifyService,
    private _confirmationService: ConfirmationService){

  }

  ngOnInit(): void {
    this.client = LocalStorageService.getUserStorageValue();
    this.getJobTypePermission();
  }

  getJobTypePermission(){
    this.loading = true;
    this._jobtypeService.getJobTypePermissions().subscribe(data=>{
      if (data.IsSucceed) {
        this.jobtypesPermission = data.Result as JobtypePermission[];
        this.loading = false;
      }else{
        this._alertify.error(data.Message);
      }
    });
  }
  addUpdateJobTypePermission(permissionId:number) {
    
    try {      
      this.displayAddUpdatePermissionPopUp = true; 
      if (permissionId>0) {
        this.btnLabel = "Update";
        this.addUpdatePermissionUpHeader = 'Update Job Type Permission';
      }else {
        this.btnLabel = "Save";
        this.addUpdatePermissionUpHeader = 'Add Job Type Permission';
      }    
      this.inputPermissionId =  permissionId;
      //Reactive Form Controls
      // this.initializeUserForm();

    } catch (error) {
      throw error;
    }
   
  }
  deleteJobtypePermission(permissionId : number){
    this.jobTypePermission.JobTypePermissionId = permissionId;
    this.jobTypePermission.LastModifiedBy = this.client.EmpId;
    this._confirmationService.confirm({
      key: "DeleteJobTypePermission",
      message: "Do you want to delete?",
      accept: () => {
        this._jobtypeService.deleteJobTypePermission(this.jobTypePermission).subscribe(
          data=>{
            if (data.IsSucceed) {
              this._alertify.success("Job type Permission Deleted Successfully.");
             this.getJobTypePermission();
            }
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
    this.getJobTypePermission();
    this.displayAddUpdatePermissionPopUp = false;
    // this.approvebtn = false;
  }
}
}
