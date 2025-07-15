export class JobtypePermission {
    constructor(){

    }
     JobTypePermissionId : number;
     JobTypeId: number;
     JobTypeLevelId: number;
     JobTypeLevelName : string; 
     JobTypeName :string;
     StudyAssignAllow :boolean;
     StudyAssignAllowOthers? :boolean;
     StudyUnAssignAllow :boolean;
     StudyUnAssignAllowOthers? :boolean;
     StudyDraftAllow :boolean;
     StudyFinalizeAllow :boolean;
     StudyAddendumAllow :boolean;
     StudyResetAllow :boolean;
     StudyResetAllowOthers? :boolean;
     StudyResetWindowHour :number;
     IsActive: boolean;
     OrgId : number;
     CreatedBy? : number;
     LastModifiedBy? : number;
}
