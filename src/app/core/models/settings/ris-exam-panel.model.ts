import { RisExamDto } from "./ris-exam-dto.model";


export class RisExamPanelModel {
  PanelId!: number;
  PanelUid!: string;
  PanelName!: string;
  ExamId?: number;
  RoomId?: number;
  Tag!: string;
  Rate!: number;
  DisplayOrder?: number;
  IsActive?: boolean;
  IsVisible?: boolean;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  Exam!: RisExamDto;
  Panelexam!: RisExamDto;
  DepartmentId?: number;
  DepartmentName!: string;
  ExamsampleId?: number;
  ExamsampleName!: string;
}
