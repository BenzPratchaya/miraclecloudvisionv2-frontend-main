import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from '../../models/shared/common-response.modle';
import { ApiService } from '../api/api.service';
import { GblEnvViewModel } from '../../models/settings/orginfos/gbl-env-view.model';
import { GeneralResModel } from '../../models/shared/general-res.model';
import { BehaviorSubject } from 'rxjs';
import { Gblenv } from '../../models/settings/orginfos/gblenv.model';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

	private apiPath = "OrgInfo/";

	constructor(
	  private _api: ApiService,
  ) { }
  private indexEvent = new BehaviorSubject<number>(0);
  indexClickEvent$ = this.indexEvent.asObservable();

  changeindexEvent(index: number) {
    this.indexEvent.next(index);
  }
	getOrgInfoes() {
		return this._api.get<CommonResponse>(`${this.apiPath}GetOrgInfoes`);
	  }
	  getOrgInfoMappingListByOrgId(orgId: number, type: string) {
		return this._api.get<GeneralResModel<GblEnvViewModel[]>>(
		  `${this.apiPath}GetOrgInfoMappingListByOrgId/${orgId}/${type}`
		);
	  }
	  getAllImagingHospital() {
		return this._api.get<GeneralResModel<GblEnvViewModel[]>>(
		  `${this.apiPath}GetAllImagingHospital`
		);
	  }
	  addGblmappingEnv(body: GblEnvViewModel) {
		return this._api.post<CommonResponse>(
		  `${this.apiPath}CreateOrgMapingInfo`,
		  body
		);
	  }
	  approvedMappingOrgInfo(request: GblEnvViewModel) {
		try {
		  return this._api.post<CommonResponse>(
			`${this.apiPath}ApprovedMappingOrgInfo`,
			request
		  );
		} catch (error) {
		  throw error;
		}
	  }
	  deactivateHospitalContact(request: GblEnvViewModel) {
		try {
		  return this._api.post<GeneralResModel<GblEnvViewModel>>(
			`${this.apiPath}DeactivateHospitalContact`,
			request
		  );
		} catch (error) {
		  throw error;
		}
	  }
	  updateHospitalContact(request: GblEnvViewModel) {
		try {
		  return this._api.post<GeneralResModel<GblEnvViewModel>>(
			`${this.apiPath}UpdateHospitalContact`,
			request
		  );
		} catch (error) {
		  throw error;
		}
	  }
	  getParentOrg(orgType: string) {
		return this._api.get<CommonResponse>(
		  `${this.apiPath}GetParentOrgInfoes/${orgType}`
		);
	  }
	  postLogo(body: FormData) {
		return this._api.post<CommonResponse>(`${this.apiPath}FileUpload`, body);
	  }

	  addGblEnv(body: Gblenv) {
		return this._api.post<CommonResponse>(`${this.apiPath}CreateOrgInfo`, body);
	  }
	  updateGblEnv(body: Gblenv) {
		return this._api.post<CommonResponse>(`${this.apiPath}UpdateOrgInfo`, body);
	  }
	  getGblEnvByParentId(orgId: number) {
		return this._api.get<CommonResponse>(
		  `${this.apiPath}GetOrgInfoByParentId/${orgId}`
		);
	  }
	  getGblEnvById(orgId: number) {
		return this._api.get<CommonResponse>(
		  `${this.apiPath}GetOrgInfoById/${orgId}`
		);
	  }
	  approveGblEnv(body: Gblenv) {
		return this._api.post<CommonResponse>(
		  `${this.apiPath}ApprovedOrgInfo`,
		  body
		);
	  }

}
