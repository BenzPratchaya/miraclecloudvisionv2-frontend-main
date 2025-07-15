
import { HrSubspecialty } from "../settings/radiologist-signup/HrSubspecialty";
import { HrEmpStudyChartModel } from "./hr-emp-study-chart.model";
import { User } from "./user";

export class HrEmpProfileModel {
  EmpprofileId!: number;
  EmpId!: number;
  ProfilePhotoFileName!: string;
  ProfilePhotoFile!: File;
  CoverPhotoFileName!: string;
  CoverPhotoFile!: File;
  AboutMe!: string;
  AboutMeIspublic?: boolean;
  SubspecialtyIspublic?: boolean;
  JoinedDateIspublic?: boolean;

  PhoneIspublic?: boolean;
  EmailIspublic?: boolean;
  StudyCountIspublic?: boolean;
  StudyChartIspublic?: boolean;
  LinkedinUrl!: string;
  LinkedinUrlIspublic?: boolean;
  FacebookUrl!: string;
  FacebookUrlIspublic?: boolean;
  TwitterUrl!: string;
  TwitterUrlIspublic?: boolean;
  OthersUrl!: string;
  OthersUrlIspublic?: boolean;
  CreatedBy?: number;
  CreatedOn!: Date;
  LastModifiedBy?: number;
  LastModifiedOn!: Date;
  // Emp: HrEmpModel;
  Emp!: User;
  PhoneMobile!: string;
  HrEmpsubspecialty!: HrSubspecialty[];
  MapOrgName!: string;
  Subspecialty!: string;
  OrgId!: number;
  TotalStudyCount?: number;
  TotalReviewCount?: number;
  AvarageRating?: number;
  EmpStudyChartModel!: HrEmpStudyChartModel[];
}
