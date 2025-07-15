import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { RisExamModel } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class OrderImportService {

  private apiPATH = "Import/";

  constructor(
    private _api: ApiService
  ) { }

  getAllExamsByOrg(orgId: number) {
    return this._api.get<RisExamModel[]>(`${this.apiPATH}getAllExamsByOrg/${orgId}`);
  }
}
