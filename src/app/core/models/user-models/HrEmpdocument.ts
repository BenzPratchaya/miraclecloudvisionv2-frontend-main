export class HrEmpdocument {
  EmpdocumentId!: number;
  EmpId!: number;
  Type!: string;
  Title!: string;
  Format!: string;
  Url!: string;
  OrgId?: number;
  SlNo?: number;
  IsDeleted?: boolean;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  File!: File;
  GUID!: string;
}
