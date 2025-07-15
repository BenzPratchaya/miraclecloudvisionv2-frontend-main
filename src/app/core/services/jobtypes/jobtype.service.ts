import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { JobtypePermission } from '../../models/JobTypes/jobtype-permission.model';
import { CommonResponse } from '../../models/shared/common-response.modle';
import { Jobtype } from '../../models/JobTypes/jobtype.model';
import { JobtypeLevel } from '../../models/JobTypes/jobtype-level.model';

@Injectable({
  providedIn: 'root'
})
export class JobtypeService {
  private apiPath = 'JobType/';
  constructor(private api: ApiService) { }
  addJobTypePermission(body:JobtypePermission){
    return this.api.post<CommonResponse>(`${this.apiPath}CreateJobtypePermission`, body);
  }
  updateJobTypePermission(body:JobtypePermission){
    return this.api.post<CommonResponse>(`${this.apiPath}UpdateJobtypePermission`, body);
  }
  deleteJobTypePermission(body:JobtypePermission){
    return this.api.post<CommonResponse>(`${this.apiPath}DeleteJobtypePermission`, body);
  }
  getJobTypePermissionById(permissionId:number){
    return this.api.get<CommonResponse>(`${this.apiPath}GetJobTypePermissionById/${permissionId}`);
  }
  getJobTypePermissions(){
    return this.api.get<CommonResponse>(`${this.apiPath}GetJobTypesPermission`);
  }

  addJobType(body:Jobtype){
    return this.api.post<CommonResponse>(`${this.apiPath}CreateJobtype`, body);
  }
  updateJobType(body:Jobtype){
    return this.api.post<CommonResponse>(`${this.apiPath}UpdateJobtype`, body);
  }
  deleteJobType(body:Jobtype){
    return this.api.post<CommonResponse>(`${this.apiPath}DeleteJobtype`, body);
  }

  getJobTypes(){
    return this.api.get<CommonResponse>(`${this.apiPath}GetJobTypes`);
  }
  getActiveJobTypes(){
    return this.api.get<CommonResponse>(`${this.apiPath}GetActiveJobTypes`);
  }

  getActiveJobTypeLevels(jobTypeId:number){
    return this.api.get<CommonResponse>(`${this.apiPath}GetActiveJobTypeLevelByJobTypeId/${jobTypeId}`);
  }
  getUserLevelByFilter(jobTypeId:number,orgId:number){
    return this.api.get<CommonResponse>(`${this.apiPath}GetUserLevelByFilter/${jobTypeId}/${orgId}`);
  }
  getJobTypeById(jobTypeId:number){
    return this.api.get<CommonResponse>(`${this.apiPath}GetJobTypeById/${jobTypeId}`);
  }


  addJobTypeLevel(body:JobtypeLevel){
    return this.api.post<CommonResponse>(`${this.apiPath}CreateJobtypeLevel`, body);
  }
  updateJobTypeLevel(body:JobtypeLevel){
    return this.api.post<CommonResponse>(`${this.apiPath}UpdateJobtypeLevel`, body);
  }
  deleteJobTypeLevel(body:JobtypeLevel){
    return this.api.post<CommonResponse>(`${this.apiPath}DeleteJobtypeLevel`, body);
  }

  getJobTypeLevelList(){
    return this.api.get<CommonResponse>(`${this.apiPath}GetJobTypeLevles`);
  }

  getJobTypeLevelById(jobTypeId:number){
    return this.api.get<CommonResponse>(`${this.apiPath}GetJobTypeLevelById/${jobTypeId}`);
  }
}
