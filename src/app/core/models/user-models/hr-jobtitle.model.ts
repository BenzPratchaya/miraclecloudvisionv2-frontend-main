import { HrEmpModel } from "./hr-emp.model";

export class HrJobtitleModel {
  jobTitleId!: number;
  jobTitleUid!: string;
  jobTitleDesc!: string;
  isActive!: string;
  orgId?: number;
  createdBy?: number;
  createdOn?: string;
  lastModifiedBy?: number;
  lastModifiedOn?: string;
  jobTitleTag!: string;
  hrEmp!: HrEmpModel[];
}
