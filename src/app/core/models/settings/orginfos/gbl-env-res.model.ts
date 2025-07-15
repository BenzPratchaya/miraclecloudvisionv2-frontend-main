export class GblEnvResModel {
  constructor(OrgName: string, OrgId: number) {
    this.OrgName = OrgName;
    this.OrgId = OrgId;
  }

  OrgId: number;
  OrgName: string;
  OrgAlias: string;
  OrgAddr1: string;
  OrgWebsite: string;

  EmpUid: string;
  UserName: string;
  SecurityQuestion: string;
  SecurityAnswer: string;
  Pwd: string;
  UnitId: number;
  JobtitleId: number;
  JobType: string;
  IsRadiologist: string;
  Salutation: string;
  Fname: string;
  Mname: string;
  Lname: string;
  TitleEng: string;
  FnameEng: string;
  MnameEng: string;
  LnameEng: string;
  Gender: string;
  EmailPersonal: string;
  EmailOfficial: string;
  PhoneHome: string;
  PhoneMobile: string;
  PhoneOffice: string;
  PreferredPhone: string;
  PabxExt: number;
  FaxNo: string;
  Dob: Date;
  BloodGroup: string;
  DefaultLang: number;
  Religion: number;
  PeAddr1: string;
  PeAddr2: string;
  PeAddr3: string;
  PeAddr4: string;
  AuthLevelId: number;
  ReportingTo: number;
  AllowOthersToFinalize: string;
  LastPwdModified: Date;
  LastLogin: Date;
  CardNo: string;
  PlaceOfBirth: string;
  Nationality: string;
  MStatus: string;
  IsActive: string;
  SupportUser: string;
  CanKillSession: string;
  DefaultShiftNo: number;
  ImgFileName: string;
  EmpReportFooter1: string;
  EmpReportFooter2: string;
  Visible: boolean;

  OrgEmail1: string;
  OrgTel1: string;
  IsApproved: boolean;
  OrgPrefix: string;
  OrgSuffix: string;
  ApprovedOn: Date;
  CreatedOn: Date;
  PacsUrl1: string;
  PacsUrl2: string;
  PacsEndpoint: string;
  BufferQueue: number;
  WarningQueue: number;
  BusQueue: number;
  BatchMwl: boolean;
  AutoSendToPacs: boolean;

  RepFooter1: string;
  DCMViewer: string;
  OrgType: string;
  OrgParentId?: number;
  AddendumPosition: string;
  LineId: string;
}
