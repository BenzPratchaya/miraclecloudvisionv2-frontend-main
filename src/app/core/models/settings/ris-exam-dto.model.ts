import { RisExamPanelModel } from "./ris-exam-panel.model";


export class RisExamDto {
  ExamId!: number;
  ExamUid!: string;
  OrgId?: number;
  IsPanel?: boolean;
  DepartmentId?: number;
  DepartmentName!: string;
  ExamsampleId?: number;
  ExamsampleName!: string;
  RoomId?: number;
  RoomName!: string;
  ExamName!: string;
  Rate!: number;
  GovtId?: number;
  GovtCode!: string;
  GovtName!: string;
  GovtRate?: number;
  ExamTypeId?: number;
  ServiceTypeId?: number;
  ServiceTypeName!: string;
  SubspecialtyId?: number;
  SubspecialtyName!: string;
  IsSubspecialtyActive?: boolean;
  SubspecialtyMappingCreatedBy?: number;
  SubspecialtyMappingLastModifiedBy?: number;
  CreatedBy!: string;
  CreatedOn?: Date;
  LastModifiedBy!: string;
  LastModifiedOn?: Date;
  IsDefault?: boolean;
  ExamPanelList: RisExamPanelModel[] = [];
  StatusName!: string;
  OrderId?: number;
}
