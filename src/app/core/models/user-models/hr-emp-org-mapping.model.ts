export class HrEmpOrgMappingModel {
  EmporgSetupId!: number;
  EmpId!: number;
  IsDefault?: boolean;
  IsActive!: boolean;
  OrgIds!: number[];
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  FullNameText!: string;
  UserId!: number;
}
