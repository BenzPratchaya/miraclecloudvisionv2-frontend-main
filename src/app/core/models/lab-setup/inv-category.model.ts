import { InvItemModel } from "./inv-item.model";

export class InvCategoryModel {
  CategoryId?: number;
  CategoryUid!: string;
  CategoryName!: string;
  CategoryDesc!: string;
  Parent?: number;
  OrgId?: number;
  CreatedBy?: number;
  CreatedOn?: Date;
  LastModifiedBy?: number;
  LastModifiedOn?: Date;
  InvItem!: InvItemModel[];
}
