export class RisExamResultNoteHistoryModel {
    ExamresultnotehistoryId!: number;
    OrderId!: number;
    ExamId!: number;
    AccessionNo!: string;
    NoteNo?: number;
    NoteText!: string;
    NoteBy?: number;
    NoteOn?: Date;
    OrgId?: number;
    CreatedBy?: number;
    CreatedOn?: Date;
    LastModifiedBy?: number;
    LastModifiedOn?: Date;
    NoteTextRtf!: string;
    VersionNo?: number;
    TransactionBy?: number;
    TransactionOn?: Date;
    AddendumPosition!: string;
    AddendumByName!: string;
}