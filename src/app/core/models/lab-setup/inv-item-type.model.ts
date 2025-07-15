import { InvItemModel } from "./inv-item.model";

export class InvItemtypeModel {
  ItemtypeId!: number;
  ItemtypeUid!: string;
  ItemtypeName!: string;
  ItemtypeDesc!: string;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  InvItem!: InvItemModel[];
}
