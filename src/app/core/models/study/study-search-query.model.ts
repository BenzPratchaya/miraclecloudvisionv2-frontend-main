export class StudySearchQueryModel {
    FromDate!: string;
    ToDate!: string;
    OrgId?: number;
    IsCloud!: boolean;
    Status: string;
    ShortBy: string;
    IsAccepted?: boolean;
    PacsIssent?: boolean;
}
