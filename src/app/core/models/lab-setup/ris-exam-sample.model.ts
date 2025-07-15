import { RisExamModel } from "../exam/ris-exam.model";


export class RisExamsample {
  ExamsampleId!: number;
  ExamsampleUid!: string;
  ExamsampleName!: string;
  ExamsampleNameeng!: string;
  ExamsampleContainer!: string;
  DisplayOrder?: number;
  IsActive?: boolean;
  IsVisible?: boolean;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  RisExam!: RisExamModel[];
}
