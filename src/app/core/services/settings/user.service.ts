import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UserListViewModel } from '../../models/settings/UserListViewModel';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { GblCountry } from '../../models/settings/radiologist-signup/GblCountry';
import { HrSubspecialty } from '../../models/settings/radiologist-signup/HrSubspecialty';
import { HrEmpOrgMappingModel } from '../../models/user-models/hr-emp-org-mapping.model';
import { CommonResponse } from '../../models/shared/common-response.modle';
import { GeneralResModel } from '../../models/shared/general-res.model';
import { OrderDocumentDownloadResModel } from '../../models/user/order-document-download-res.model';
import { HrEmpdocument } from '../../models/user-models/HrEmpdocument';
import { GblProvince } from '../../models/settings/radiologist-signup/GblProvince';
import { GblDistrict } from '../../models/settings/radiologist-signup/GblDistrict';
import { GblSubdistrict } from '../../models/settings/radiologist-signup/GblSubdistrict';
import { GblPostalCode } from '../../models/settings/radiologist-signup/GblPostalCode';
import { GblReferralModel, User } from '../../models';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiPATH = "User/";
  private baseURL = `${environment.apiUrl}User/`;
  private hospitalContract = new BehaviorSubject<boolean>(false);
  currenthospitalContract = this.hospitalContract.asObservable();

  constructor(
    private _api: ApiService,
) { }

getUserAfterVerification(orgId:number) {
  return this._api.get<UserListViewModel[]>(`${this.apiPATH}getUserAfterVerification/${orgId}`);
}
getRadiologistByOrgId(orgId: number) {
  return this._api.get<UserListViewModel[]>(`${this.apiPATH}GetRadiologistByOrgId/${orgId}`);
}
getUserMappingByOrgId(orgId: number, empId?: number) {
  let url = `${this.apiPATH}GetUserMappingByOrgId/${orgId}`;
  if (empId !== undefined) {
    url += `/${empId}`;
  }
  return this._api.get<UserListViewModel[]>(url);
  
}
getCountryList() {
  return this._api.get<GblCountry[]>(`${this.apiPATH}countries`);
}
getSubSpecialtyList() {
  return this._api.get<HrSubspecialty[]>(`${this.apiPATH}SubSpecialty`);
}
addEmpMapping(user: HrEmpOrgMappingModel) {
  try {
    return this._api.post<CommonResponse>(
      `${this.apiPATH}AddEmpMapping`,
      user
    );
  } catch (error) {
    throw error;
  }
}
approveEmpMappOrg(user: UserListViewModel) {
  try {
    return this._api.post<CommonResponse>(
      `${this.apiPATH}ApproveEmpMappOrg`,
      user
    );
  } catch (error) {
    throw error;
  }
}
deactivateRadiologistContact(request: UserListViewModel) {
  return this._api.post<GeneralResModel<UserListViewModel>>(
    `${this.apiPATH}InActiveEmpMappOrg`,
    request
  );
}
downloadUserDocument(empId: number) {
  return this._api.post<OrderDocumentDownloadResModel>(
    `${this.baseURL}downloadUserDocument/${empId}`,
    {}
  );
}
getUserDocumentList(userId: number) {
  return this._api.get<HrEmpdocument[]>(
    `${this.apiPATH}getUserDocumentList/${userId}`
  );
}

changehospitalContract(show: boolean) {
  this.hospitalContract.next(show);
}
getProvinces() {
  return this._api.get<GblProvince[]>(`${this.apiPATH}Provinces`);
}

getDistricts() {
  return this._api.get<GblDistrict[]>(`${this.apiPATH}Districts`);
}
getSubdistricts() {
  return this._api.get<GblSubdistrict[]>(`${this.apiPATH}SubDistricts`);
}

getGblActivePackages() {
  return this._api.get<CommonResponse>(`${this.apiPATH}GetGblActivePackage`);
}
getSubDistrictList(districtId: number) {
  return this._api.get<GblSubdistrict[]>(
    `${this.apiPATH}SubDistricts/${districtId}`
  );
}
getPostalCodesByDistricId(districtId: number) {
  return this._api.get<GeneralResModel<GblPostalCode[]>>(
    `${this.apiPATH}GetPostalCodesByDistricId/${districtId}`
  );
}

getAddressList() {
  return this._api.get<CommonResponse>(`${this.apiPATH}GetAddressList`);
}

  getEmpOrgMapping(jobtypeId: number, orgId: number) {
    return this._api.get<GeneralResModel<HrEmpOrgMappingModel[]>>(
      `${this.apiPATH}GetEmpOrgMaping/${jobtypeId}/${orgId}`
    );
  }

  getReferralListByOrgIdAndType(
    orgId: number,
    type: string,
    isActive: boolean
  ) {
    return this._api.get<GeneralResModel<GblReferralModel[]>>(
      `${this.apiPATH}GetReferralListByOrgIdAndType/${orgId}/${type}/${isActive}`
    );
  }

  getProvinceList(CountryId: number) {
    return this._api.get<GblProvince[]>(`${this.apiPATH}Provinces/${CountryId}`);
  }
  getDistrictList(provinceId: number) {
    return this._api.get<GblDistrict[]>(
      `${this.apiPATH}Districts/${provinceId}`
    );
  }
  getAllOrgListByOrgId(orgId: number) {
    return this._api.get<CommonResponse>(
      `${this.apiPATH}getAllOrgListByOrgId/${orgId}`
    );
  }
  // save User information in HR_Emp Table
  addNewUser(user: FormData) {
    try {
      return this._api.post<User>(`${this.apiPATH}AddNewUser`, user);
    } catch (error) {
      throw error;
    }
  }

  updateUserPassword(user: User): any {
    return this._api.put<User>(`${this.apiPATH}updateUserPassword`, user);
  }

  updateUser(user: User) {
    return this._api.post<User>(`${this.apiPATH}updateUser/`, user);
  }

  approveUser(userId: number) {
    return this._api.put<boolean>(`${this.apiPATH}approveUser/${userId}`, null);
  }

  denyUser(user: User) {
    return this._api.post<boolean>(`${this.apiPATH}denyUser`, user);
  }
  
  isExistEmail(email: string): Observable<boolean> {
    return this._api.get<boolean>(`${this.apiPATH}isExistingUserEmail/${email}`);
  }
}
