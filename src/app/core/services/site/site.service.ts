import { Injectable } from '@angular/core';
import { GeneralResModel, SiteInformationModel } from '../../models';
import { SiteInformation } from '../../models/settings/site-information';
import { BehaviorSubject, Observable } from 'rxjs';
import { GblEnvResModel } from '../../models/settings/orginfos/gbl-env-res.model';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  photoUrl = new BehaviorSubject<string>("");
  private apiPATH = "Site/";
  private url: string;

  private baseURL = `${environment.apiUrl}Site/`;

  constructor(
    private router: Router,
    private api: ApiService,
    private _httpClient: HttpClient
  ) {}

  getCustometHospitalList() {
    return this._httpClient.get<SiteInformation[]>(
      `${this.baseURL}getCustometHospitalList`
    );
  }

  getFilterHospitalList(type: string) {
    return this._httpClient.get<GeneralResModel<SiteInformation[]>>(
      `${this.baseURL}GetFilterHospitalList/${type}`
    );
  }

  getHospitalListByOrgId(orgid: any, type: string) {
    return this._httpClient.get<SiteInformationModel[]>(
      `${this.baseURL}GetHospitalListByOrgId/${orgid}/${type}`
    );
  }

  getHospitalList() {
    return this.api.get<SiteInformationModel[]>(`${this.apiPATH}getHospitalList`);
  }

  getHospitalListbyCustomerId() {
    return this.api.get<SiteInformation[]>(
      `${this.apiPATH}getHospitalListById`
    );
  }
  getSiteInfos() {
    return this.api.get<SiteInformation[]>(`${this.apiPATH}getSiteInfos`);
  }

  approveSite(siteInfo: SiteInformation) {
    return this.api.post<boolean>(`${this.apiPATH}approveSite`, siteInfo);
  }

  denySite(siteInfo: SiteInformation) {
    return this.api.post<boolean>(`${this.apiPATH}denySite`, siteInfo);
  }
  insertSiteInformation(site: SiteInformation) {
    return this.api.post<boolean>(`${this.apiPATH}insertSiteInformation`, site);
  }
  getUniqueSuffix() {
    let response = this.api.get<string>(`${this.apiPATH}getUniqueOrgSuffix`);
    return response;
  }

  getUniquePrefix(orgName) {
    let response = this.api.get<string>(
      `${this.apiPATH}getUniqueOrgPrefix/${orgName}`
    );
    return response;
  }

  isExistEmail(email: string): Observable<boolean> {
    return this.api.get<boolean>(`${this.apiPATH}isExistingSiteEmail/${email}`);
  }

  getSiteDetail(orgId: number) {
    return this.api.get<SiteInformation>(
      `${this.apiPATH}getSiteDetail/${orgId}`
    );
  }

  getGblEnv(orgId: number) {
    return this.api.get<GblEnvResModel>(
      `${this.apiPATH}getSiteDetail/${orgId}`
    );
  }

  updateSitePacsEndPoint(orgId: number, endPoint: string) {
    return this.api.put<SiteInformation>(
      `${this.apiPATH}updateSitePacsEndPoint/${orgId}/${endPoint}`,
      SiteInformation
    );
  }
  updateSiteDetails(site: SiteInformation) {
    return this.api.put<SiteInformation>(
      `${this.apiPATH}updateSiteDetails`,
      site
    );
  }

  emailAlreayExists(email: string) {
    return this.api.get<boolean>(`${this.apiPATH}emailAlreayExists/${email}`);
  }

  addNewHospital(org: FormData) {
    // return this.api.post<User>(`${this.apiPATH}addNewRadiologist`, user );

    return this._httpClient.post<boolean>(
      `${this.baseURL}addNewHospital`,
      org,
      {
        responseType: "json",
      }
    );
  }

}
