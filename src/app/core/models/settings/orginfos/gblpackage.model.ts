export class Gblpackage {
    /**
     *
     */
    constructor() {
        this.PackageId = 0;
        this.PackageName = "";
        this.PackageUID = "";
        this.PackageDescription = "";
        this.Rate = "";
        this.IsReporting = false;
        this.IsScheduling = false;
        this.IsPatientPortal = false;
        this.DataRetentionDay = 0;
        this.AnalyticsType = "";
        this.PackageSubscriptionId = 0;
        this.HospitalId = 0;
        this.HospitalName = "";
        this.IsActive = false;
        this.ActiveDate = new Date();
        this.OrgId = 0;
        this.CreatedBy = 0;
        this.CreatedOn = new Date();
        this.LastModifiedBy = 0;
        this.LastModifiedOn = new Date();
    }
    PackageId: number;
    PackageName?: string;
    PackageUID: string;
    PackageDescription: string;
    Rate: string;
    IsReporting: Boolean;
    IsScheduling: Boolean;
    IsPatientPortal: Boolean;
    DataRetentionDay: number;
    AnalyticsType: string;
    PackageSubscriptionId: number;
    HospitalId: number;
    HospitalName: string;
    IsActive: Boolean;
    ActiveDate?: Date;
    OrgId: number;
    CreatedBy?: number;
    CreatedOn: Date;
    LastModifiedBy?: number;
    LastModifiedOn: Date;
    InactivedReason!: string;
    NextBillingDate?:Date;
}
