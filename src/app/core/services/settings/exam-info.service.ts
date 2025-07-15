import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GeneralResModel, RisExamModel } from '../../models';
import { ExamDtoModel } from '../../models/settings/exam-dto.model';
import { RisExamDto } from '../../models/settings/ris-exam-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ExamInfoService {

  private baseURL = `${environment.apiUrl}examInfo/`;

  constructor(private _httpClient: HttpClient) {}

  getAllExam(orgId: number) {
    return this._httpClient.get<GeneralResModel<RisExamDto[]>>(
      `${this.baseURL}GetAllExam/${orgId}`
    );
  }
  addExamInformation(request: ExamDtoModel) {
    return this._httpClient.post<GeneralResModel<ExamDtoModel>>(
      `${this.baseURL}AddExamInformation`,
      request
    );
  }

  updateExamInformation(request: ExamDtoModel) {
    return this._httpClient.post<GeneralResModel<ExamDtoModel>>(
      `${this.baseURL}UpdateExamInformation`,
      request
    );
  }

}
