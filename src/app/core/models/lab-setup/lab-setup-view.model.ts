export class LabSetupViewModel {

  constructor() {
    this.itemImageList = [];
  }
  DepartmentId!: number;
  DepartmentUid!: string;
  DepartmentName!: string;
  DepartmentNameeng!: string;
  IsActive?: boolean;
  IsDefault?: boolean;
  IsVisible?: boolean;
  IsTracking?: boolean;
  ItemId!: number;
  ItemUid!: string;
  ItemName!: string;
  ItemDesc!: string;
  ItemImg!: string;
  ItemBarcode!: string;
  CategoryId?: number;
  TxnUnit?: number;
  ReOrderDays?: number;
  ReOrderQty?: number;
  OrderLeadTime?: number;
  IsForeign!: string;
  IncludeInAutoPr!: string;
  GlCode?: number;
  IsFa!: string;
  IsReusable!: string;
  ReusePricePerc?: number;
  PurchasePrice?: number;
  SellingPrice?: number;
  AllowPartialDelivery?: string;
  AllowPartialRecieve!: string;
  WarningEmpty?: number;
  DangerousEmpty?: number;
  ItemtypeId?: number;
  UnitId?: number;
  ItemtypeUid!: string;
  ItemtypeName!: string;
  ItemtypeDesc!: string;
  UnitUid!: string;
  UnitName!: string;
  UnitDesc!: string;
  ExternalUnit?: number;
  ConversionValue?: number;
  BaseUnitId?: number;
  CategoryUid!: string;
  CategoryName!: string;
  CategoryDesc!: string;
  Parent!: number;
  ExamsampleId!: number;
  ExamsampleUid!: string;
  ExamsampleName!: string;
  ExamsampleNameeng!: string;
  ExamsampleContainer!: string;
  DisplayOrder?: number;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  Tag!: string;
  InActiveReason!: string;
  InActiveBy!: number;
  ServiceType!: string;

  RoomId!: number;
  RoomUid!: string;
  RoomName!: string;
  RoomNameeng!: string;

  VendorId?: number;
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
  CurrentStock?: number;
  OpeningStock?: number;
  StockOutAlgorithm?: number;
  IsAllowOBChanges?: boolean;
  IsPOReportEmail?: boolean;
  itemImageList?:InvItemImages[];
}

export class InvItemImages {
  itemImagesId!: number;
  itemid!: number;
  imageURL!: string;
  orgId!: number | null;
  createdBy!: number | null;
  createdOn!: string | null;
  lastModifiedBy!: number | null;
  lastModifiedOn!: string | null;
  isDefault!: boolean | null;
}

export class ItemImgesViewModel {
    orgId!: number;
    itemId!: number;
    createdBy!: number;
    itemImgs!: ItemImg[];
}

export class ItemImg {
    images!: File | null;
    isDefault!: boolean;
    itemImage!: File;
}
