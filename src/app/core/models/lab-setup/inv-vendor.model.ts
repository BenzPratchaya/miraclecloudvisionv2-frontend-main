import { InvItemModel } from "./inv-item.model";

export class InvVendorModel {
  VendorId!: number;
  VendorUid!: string;
  VendorName!: string;
  VendorContact!: string;
  VendorAddress!: string;
  VendorCity!: string;
  VendorState!: string;
  VendorZip!: string;
  VendorPhone!: string;
  VendorFax!: string;
  VendorEmail!: string;
  VendorWebsite!: string;
  Comments!: string;
  IsActive?: boolean;
  IsPOReportEmail?: boolean;
  IsDefault?: boolean;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  InvItem!: InvItemModel[];
}
