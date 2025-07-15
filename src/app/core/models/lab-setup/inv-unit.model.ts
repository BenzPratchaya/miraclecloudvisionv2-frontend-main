import { InvItemModel } from "./inv-item.model";

export class InvUnitModel {
  UnitId!: number;
  UnitUid!: string;
  UnitName!: string;
  UnitDesc!: string;
  ExternalUnit?: number;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  ConversionValue?: number;
  BaseUnitId?: number;
  InvItem!: InvItemModel[];
}
