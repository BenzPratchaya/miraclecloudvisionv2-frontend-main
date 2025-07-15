import { RisExamModel } from "../exam/ris-exam.model";
import { InvItemModel } from "./inv-item.model";

export class RisExamconsumablesModel {
  ExamconsumablesId!: number;
  ExamconsumablesUid!: string;
  ExamId?: number;
  ItemId?: number;
  Quantity?: number;
  DisplayOrder?: number;
  IsActive?: boolean;
  IsVisible?: boolean;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  ItemtypeId?: number;
  CategoryId?: number;
  ItemName!: string;
  ExamName!: string;
  RoomName!: string;
  DepartmentName!: string;
  ExamsampleName!: string;
  AnalyzeritemName!: string;
  CategoryName!: string;
  Exam: RisExamModel = new RisExamModel;
  Item!: InvItemModel;
}
