export class GblReferralModel {
    ReferralId: number;
    ReferralUid: string;
    ReferralName: string;
    ReferralType: string;
    OfficialId: string;
    EmailOfficial: string;
    PhoneNo: string;
    EmpId?: number;
    IsActive?: boolean;
    OrgId: number;
    CreatedBy?: number;
    CreatedOn?: Date;
    LastModifiedBy?: number;
    LastModifiedOn?: Date;
}
  