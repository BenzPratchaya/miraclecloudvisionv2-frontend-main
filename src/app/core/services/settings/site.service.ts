import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api/api.service';
import { HttpClient } from '@angular/common/http';
import { SiteInformation } from '../../models/settings/site-information';
import { GeneralResModel } from '../../models/shared/general-res.model';
import { GblEnvViewModel } from '../../models/settings/orginfos/gbl-env-view.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  photoUrl = new BehaviorSubject<string>("");
  private apiPATH = "Site/";
  private url!: string;

  private baseURL = `${environment.apiUrl}Site/`;

  constructor(
    private router: Router,
    private api: ApiService,
    private _httpClient: HttpClient
  ) {}

  
  getOrgInfoMappingListByOrgId(orgId: number, type: string) {
    return this.api.get<GeneralResModel<GblEnvViewModel[]>>(
      `${this.baseURL}GetOrgInfoMappingListByOrgId/${orgId}/${type}`
    );
  }
  getFilterHospitalList(type: string) {
    return this._httpClient.get<GeneralResModel<SiteInformation[]>>(
      `${this.baseURL}GetFilterHospitalList/${type}`
    );
  }
}
