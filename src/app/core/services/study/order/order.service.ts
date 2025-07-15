import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { GeneralResModel, OrderDocumentModel, ReferToHospitalRequestModel, StudyModel, StudySearchQueryModel } from 'src/app/core/models';
import { CommonResponse } from 'src/app/core/models/shared/common-response.modle';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrgResponseViewModel } from 'src/app/core/models/study/org-response-view.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiPATH = "PatientOrder/";
  private baseURL = `${environment.apiUrl}PatientOrder/`;

  private orderRowDataSubject = new BehaviorSubject<StudyModel>({} as StudyModel);
  private orderDataSubject = new BehaviorSubject<StudyModel[]>([]);
  data$ = this.orderDataSubject.asObservable();
  rowData$ = this.orderRowDataSubject.asObservable();

  constructor(
    private _api: ApiService,
    private _httpClient: HttpClient,
  ) {}

  setOrderData(newData: StudyModel[]): void {
    this.orderDataSubject.next(newData);
  }

  setOrderRowData(newData: StudyModel): void {
    this.orderRowDataSubject.next(newData);
  }

  getInboxOrders(request: StudySearchQueryModel) {
    return this._api.post<GeneralResModel<StudyModel[]>>(`${this.apiPATH}GetWorklistInbox`, request);
  }

  getSentOrders(request: StudySearchQueryModel) {
    return this._api.post<GeneralResModel<StudyModel[]>>(`${this.apiPATH}GetWorklistSent`, request);
  }

  acceptPatient(request: StudyModel) {
    return this._api.post<GeneralResModel<boolean>>(`${this.apiPATH}AcceptPatient`, request);
  }

  acceptedStudy(request: StudyModel) {
    return this._api.post<GeneralResModel<boolean>>(`${this.apiPATH}AcceptedStudy`, request);
  }

  approvedStudy(request: StudyModel) {
    return this._api.post<GeneralResModel<boolean>>(`${this.apiPATH}ApprovedStudy`, request);
  }

  addStudyExam(request: StudyModel) {
    return this._api.put<CommonResponse>(`${this.apiPATH}AddStudyExam`, request);
  }

  submitStudy(request: StudyModel) {
    return this._api.put<boolean>(
      `${this.apiPATH}UpdateandSubmitStudy`, request);
  }

  referToToHospital(request: ReferToHospitalRequestModel) {
    return this._api.post<boolean>(`${this.apiPATH}ReferToToHospital`, request);
  }

  // Order Documents
  uploadOrderDocument(request: FormData) {
    return this._httpClient.post<OrderDocumentModel[]>(
      `${this.baseURL}uploadOrderDocument`,
      request,
      {
        responseType: "json",
      }
    );
  }

  getUploadedDocumentList(orderId: number) {
    return this._api.get<OrderDocumentModel[]>(
      `${this.apiPATH}getUploadedDocumentList/${orderId}`
    );
  }

  downloadOrderDocument(orderDocumentId: number) {
    return this._api.post(
      `${this.apiPATH}downloadOrderDocument/${orderDocumentId}`,
      {}
    );
  }
  getPatientValidaty(orderId: number, accNo: string, userId: number,ssn:string) {
    return this._httpClient.get<GeneralResModel<OrgResponseViewModel>>(
      `${this.baseURL}GetPatientValidaty/${orderId}/${accNo}/${userId}/${ssn}`
    );
  }
  deleteOrderDocument(orderDocumentId: number) {
    return this._api.post<boolean>(
      `${this.apiPATH}deleteOrderDocument/${orderDocumentId}`,
      {}
    );
  }
}
