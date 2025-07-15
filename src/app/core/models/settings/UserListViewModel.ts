import { Binary } from "@angular/compiler";
import { HrEmpdocument } from "../user-models/HrEmpdocument";
import { UserRoleModel } from "../user-models/user-role.model";

export class UserListViewModel {
  /**
   *
   */
  constructor() {

  }
  UserId: number;
  UserUid: string;
  IsRadiographer?: boolean;
  SecurityQuestion: string;
  SecurityAnswer: string;

  EmpId: number;
  EmpUid: string;
  UserName: string;
  JobType: string;
  JobTypeName: string;
  JobTypeId: number;
  JobTypeUid: string;
  JobTypeLevelId: number;
  JobTypeLevelUid: string;
  JobTypeLevelName: string;
  Fname: string;
  Mname: string;
  Lname: string;
  Gender: string;
  EmailOfficial: string;
  PhoneMobile: string;
  IsActive: boolean;
  ImgFileName: string;
  OrgId: number;
  OrgName: string;
  MapOrgName: string;
  CreatedBy: number;
  CreatedOn: Date;
  LastModifiedBy: number;
  LastModifiedOn: Date;
  Status: string;
  FullName: string;
  LineId: string;
  CountryId: number;
  CountryName: string;
  ProvinceId: number;
  ProvinceName: string;
  DistrictId: number;
  DistrictName: string;
  SubdistrictId: number;
  SubSpecialityId: any[];
  SubdistrictName: string;
  ZipCode: string;
  OrgType: string;
  SubSpecialityName: string;
  ParentOrgName: string;
  ParentOrgId: number;
  MedicalLincence: string;
  Password: string;
  IsEmpMappingActive?: boolean;
  EmporgSetupId: number;
  InactivatedDate?: Date;
  InactivatedBy?: number;
  InactivatedReason: string;
  ActivatedDate?: Date;
  ActivatedBy?: number;
  ActivatedReason: string;
  HospitalType: string;



  Pwd?: string;
  UnitId!: number;
  JobtitleId!: number;
  TitleNls!: string;
  FnameNls!: string;
  MnameNls!: string;
  LnameNls!: string;
  TitleEng!: string;
  FnameEng!: string;
  MnameEng!: string;
  LnameEng!: string;
  AliasName!: string;
  EmailPersonal!: string;
  PhoneHome!: string;
  PhoneOffice!: string;
  PreferredPhone!: string;
  PabxExt!: number;
  FaxNo!: string;
  Dob!: Date;
  BloodGroup!: string;
  Address!: string;
  DefaultLang!: number;
  Religion!: number;
  AuthLevelId!: number;
  ReportingTo!: number;
  LastPwdModified!: Date;
  CardNo!: string;
  PlaceOfBirth!: string;
  Nationality!: string;
  MStatus!: string;
  SupportUser!: boolean;
  CanKillSession!: boolean;
  AllowOthersToFinalize!: boolean;
  CanExceedSchedule!: boolean;
  EmpReportFooter1!: string;
  EmpReportFooter2!: string;
  Themes!: string;
  MenuLayout!: string;
  ProfileLayout!: string;
  IsCompact!: boolean;
  IsGuest!: boolean;
  AppCustomerID!: number;

  PwdHash!: Binary;
  PwdSalt!: Binary;
  TimeZoneId!: string;
  IsAutoRefresh!: boolean;
  RefreshTime!: number;
  OldPwd!: string;
  IsLineGroupAdded?: boolean;
  EmailActivationCode!: string;
  EmailVerificationExpDatetime!: Date;
  IsEmailVerified!: boolean;
  PwResetExpDatetime!: Date;
  PwResetDatetime!: Date;
  ResetPwCode!: string;
  Host!: string;
  Port!: string;
  Scheme!: string;

  FullNameText!: string;

  IsSuperAdmin!: boolean;
  WorkListType!: string;
  IsImmediateReportWrite?: boolean;
  WorklistOrder!: string;
  SignatureFileName!: string;
  SkipEmailVerification!: boolean;
  Rolls!: UserRoleModel[];

  AIType!: string;

  OrgParentId?: number;
  LineAccessToken!: string;
  LineUserName!: string;

  HospitalIds!: any[];
  HrEmpsubspecialty!: any[];
  IsPhoneVerified!: boolean;
  StudyAssignAllow!: boolean;
  StudyUnAssignAllow!: boolean;
  StudyDraftAllow!: boolean;
  StudyFinalizeAllow!: boolean;
  StudyAddendumAllow!: boolean;
  StudyResetAllow!: boolean;
  StudyResetWindowHour!: number;
  StudyAssignAllowOthers?: boolean;
  StudyUnAssignAllowOthers?: boolean;
  StudyResetAllowOthers?: boolean;
  IsImaging!: boolean;
  IsReferring!: boolean;
  IsOwnerMandatory?: boolean;
  PhoneMobileCode!: string;
  Is2faenable?: boolean;
  TotpSecretkey!: string;
  TotpEnableon?: Date;
  TotpDisableon?: Date;
  TotpDisablereason!: string;
  TotpVerifyCode!: string;
  BackupCode!: string;
  IsTotpSecretkeyExits!: boolean;
  IsSsnmandatory!: boolean;
    IsStudyautosubmit!: boolean;
hrEmpdocuments: HrEmpdocument[] = [];
  }
  