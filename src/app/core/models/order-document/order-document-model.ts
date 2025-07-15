export class OrderDocumentModel {
  File!: File;
  OrgId!: number;
  OrderDocumentId!: number;
  OrderId!: number;
  Type!: string;
  TypeData!: TypeDataObj;
  Title!: string;
  Format!: string;
  URL!: string;
  SlNo!: number;
  IsDeleted!: boolean;
  CreatedBy!: number;
  CreatedOn!: Date;
  Files!: File[];
  OrgIdreferto?: number;
}

class TypeDataObj {
  name!: string;
  code!: string;
}
