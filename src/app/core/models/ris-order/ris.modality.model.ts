import { RisOrderDtlModel } from "./ris-order-dtl.model";

export class RisModalityModel {
  ModalityId!: number;
  ModalityUid!: string;
  ModalityName!: string;
  ModalityType?: number;
  Allproperties!: string;
  UnitId?: number;
  IsActive!: string;
  StartTime?: string;
  EndTime?: string;
  AvgInvTime?: number;
  RoomId?: number;
  CasePerDay?: number;
  RestrictLevel!: string;
  IsUpdated!: string;
  IsDeleted!: string;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: string;
  LastModifiedBy?: number;
  LastModifiedOn?: string;
  IsVisible!: string;
  IsDefault!: boolean;
  PatDestId?: number;
  Announce!: string;
  RisOrderdtl!: RisOrderDtlModel[];
}
