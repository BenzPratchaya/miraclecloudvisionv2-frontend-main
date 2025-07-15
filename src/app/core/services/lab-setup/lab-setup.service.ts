import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralResModel } from '../../models';
import { InvVendorModel } from '../../models/lab-setup/inv-vendor.model';
import { CommonResponse } from '../../models/shared/common-response.modle';
import { RisExamsample } from '../../models/lab-setup/ris-exam-sample.model';
import { InvItemImagesModel } from '../../models/lab-setup/inv-item-images.model';
import { LabSetupViewModel } from '../../models/lab-setup/lab-setup-view.model';

@Injectable({
  providedIn: 'root'
})
export class LabSetupService {

  private baseURL = `${environment.apiUrl}`;
  private apiPATH = this.baseURL + `LabSetup/`;

  constructor(private _httpClient: HttpClient) {}

  getActiveDepartmentList(orgId?: number) {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel[]>>(
      `${this.apiPATH}GetActiveDepartmentList/${orgId}`
    );
  }

  getDepartmentById(departmentId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetDepartmentById/${departmentId}`
    );
  }

  getItemImgListByItemId(itemId: number) {
    return this._httpClient.get<GeneralResModel<InvItemImagesModel[]>>(
      `${this.apiPATH}GetItemImgListByItemId/${itemId}`
    );
  }

  uploadItemImages(body: FormData) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}AddInvItemImage`,
      body
    );
  }

  addDepartment(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}AddDepartment`,
      body
    );
  }

  removeDepartment(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}RemoveDepartment`,
      body
    );
  }

  updateDepartment(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}UpdateDepartment`,
      body
    );
  }

  getInventoryCategoryList(orgId: number) {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel[]>>(
      `${this.apiPATH}GetInvCategoryList/${orgId}`
    );
  }

  // Exam Sample Start
  getActiveExamSampleListByOrgId(orgId: number) {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel[]>>(
      `${this.apiPATH}GetActiveExamSampleListByOrgId/${orgId}`
    );
  }

  getActiveExamSampleList() {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel[]>>(
      `${this.apiPATH}GetActiveExamSampleList`
    );
  }

  addExamSample(request: RisExamsample) {
    return this._httpClient.post<GeneralResModel<RisExamsample>>(
      `${this.apiPATH}AddExamSample`,
      request
    );
  }

  updateExamSample(request: RisExamsample) {
    return this._httpClient.post<GeneralResModel<RisExamsample>>(
      `${this.apiPATH}UpdateExamSample`,
      request
    );
  }

  removeExamSample(request: RisExamsample) {
    return this._httpClient.post<GeneralResModel<RisExamsample>>(
      `${this.apiPATH}RemoveExamSample`,
      request
    );
  }

  // Exam Sample End

  getItemList(categoryId: number, orgId: number) {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel[]>>(
      `${this.apiPATH}GetItemList/${categoryId}/${orgId}`
    );
  }

  getItemListByFilter(categoryId: number, itemTypeId: number, orgId: number) {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel[]>>(
      `${this.apiPATH}GetItemList/${categoryId}/${itemTypeId}/${orgId}`
    );
  }

  getItemtypeListByOrgId(orgId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetItemtypeListByOrgId/${orgId}`
    );
  }

  getItemtypeById(typeId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetItemtypeById/${typeId}`
    );
  }
  addItemtype(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}AddItemtype`,
      body
    );
  }
  removeItemtype(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}RemoveItemtype`,
      body
    );
  }
  updateItemtype(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}UpdateItemtype`,
      body
    );
  }

  ///

  getInvUnitListByOrgId(orgId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetInvUnitListByOrgId/${orgId}`
    );
  }

  getInvCategoryList(orgId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetInvCategoryList/${orgId}`
    );
  }

  getAllItemList(orgId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetAllItemList/${orgId}`
    );
  }

  getTrackingItemList(orgId: number, isTracking?: boolean) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetAllItemList/${orgId}/${isTracking}`
    );
  }

  getInvUnitById(unitId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetInvUnitById/${unitId}`
    );
  }
  addInvUnit(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}AddInvUnit`,
      body
    );
  }
  removeInvUnit(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}RemoveInvUnit`,
      body
    );
  }
  updateInvUnit(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}UpdateInvUnit`,
      body
    );
  }
  addInvItem(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}AddInvItem`,
      body
    );
  }
  updateInvItem(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}UpdateInvItem`,
      body
    );
  }

  inActiveInvItem(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}InActiveInvItem`,
      body
    );
  }
  getInvItemById(itemId: number) {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel>>(
      `${this.apiPATH}GetInvItemById/${itemId}`
    );
  }

  getCategoryById(categoryId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetCategoryById/${categoryId}`
    );
  }
  addCategory(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}AddCategory`,
      body
    );
  }
  removeCategory(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}RemoveCategory`,
      body
    );
  }
  updateCategory(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}UpdateCategory`,
      body
    );
  }

  //  Room CRUD

  getActiveRoomList(orgId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetActiveRoomList/${orgId}`
    );
  }

  getRoomById(roomId: number) {
    return this._httpClient.get<CommonResponse>(
      `${this.apiPATH}GetRoomById/${roomId}`
    );
  }

  addRoom(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}AddRoom`,
      body
    );
  }
  removeRoom(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}RemoveRoom`,
      body
    );
  }
  updateRoom(body: LabSetupViewModel) {
    return this._httpClient.post<CommonResponse>(
      `${this.apiPATH}UpdateRoom`,
      body
    );
  }

  // Vendor START
  getActiveVendorList(orgId: number) {
    return this._httpClient.get<GeneralResModel<LabSetupViewModel[]>>(
      `${this.apiPATH}GetActiveVendorList/${orgId}`
    );
  }

  addVendor(request: InvVendorModel) {
    return this._httpClient.post<GeneralResModel<InvVendorModel>>(
      `${this.apiPATH}AddVendor`,
      request
    );
  }

  updateVendor(request: InvVendorModel) {
    return this._httpClient.post<GeneralResModel<boolean>>(
      `${this.apiPATH}UpdateVendor`,
      request
    );
  }

  getVendorById(vendorId: number) {
    return this._httpClient.get<GeneralResModel<InvVendorModel>>(
      `${this.apiPATH}GetVendorById/${vendorId}`
    );
  }

  removeVendor(request: InvVendorModel) {
    return this._httpClient.post<GeneralResModel<boolean>>(
      `${this.apiPATH}RemoveVendor`,
      request
    );
  }

  // Vendor END
}
