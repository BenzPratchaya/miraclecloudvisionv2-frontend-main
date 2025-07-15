import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
// import { ConfirmationService } from 'primeng/api/confirmationservice';
import { GblEnvViewModel, GeneralResModel, User } from 'src/app/core/models';
import { Gblenv } from 'src/app/core/models/settings/orginfos/gblenv.model';
import { Gblpackage } from 'src/app/core/models/settings/orginfos/gblpackage.model';
import { Parentorginfo } from 'src/app/core/models/settings/orginfos/parentorginfo.model';
import { RisSetup } from 'src/app/core/models/settings/orginfos/ris-setup.model';
import { GblAddress } from 'src/app/core/models/settings/radiologist-signup/GblAddress';
import { GblCountry } from 'src/app/core/models/settings/radiologist-signup/GblCountry';
import { GblDistrict } from 'src/app/core/models/settings/radiologist-signup/GblDistrict';
import { GblPostalCode } from 'src/app/core/models/settings/radiologist-signup/GblPostalCode';
import { GblProvince } from 'src/app/core/models/settings/radiologist-signup/GblProvince';
import { GblSubdistrict } from 'src/app/core/models/settings/radiologist-signup/GblSubdistrict';
import { SiteInformation } from 'src/app/core/models/settings/site-information';
import { LocalStorageService, SiteService } from 'src/app/core/services';
import { AlertifyService } from 'src/app/core/services/common/toast/alertify.service';
import { OrgService } from 'src/app/core/services/settings/org.service';
import { UserService } from 'src/app/core/services/settings/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-addupdate-orginfo',
  templateUrl: './addupdate-orginfo.component.html',
  styleUrls: ['./addupdate-orginfo.component.scss']
})
export class AddupdateOrginfoComponent implements OnInit, OnChanges {
  @Input() orgId: number = 0;
  @Input() isApproveBtn: boolean = false;
  @Input() loaderVisible: boolean = true;
  @Input() btnText: string = "Save";
  @Output() response: EventEmitter<boolean> = new EventEmitter();

  @Input() gblAddress: GblAddress = new GblAddress();
  @Input()
  countryList: GblCountry[] = [];

  public authTypeList: any[] = [];
  public orgTypeList: any[] = [];
  public apiSubmitScheduleList: any[] = [];
  public addendumPosition: any[] = [];
  public PatientTypes: any[] = [];
  public parentOrgList: Parentorginfo[] = [];
  public signUpOrgTypeList: any[] = [];
  public model: Gblenv = new Gblenv();
  public fetchModel: Gblenv = new Gblenv();
  //countryList: GblCountry[];
  districtList: GblDistrict[] = [];
  provinceList: GblProvince[] = [];
  subDistrictList: GblSubdistrict[] = [];
  postalCodeList: GblPostalCode[] = [];

  formgroup: FormGroup;
  risSetupList: RisSetup[] = [];
  risSetupAPISubmitList: RisSetup[] = [];
  workLoadDurationList: RisSetup[] = [];
  client: User = new User();
  setuptype: string = "HTYPE";
  apisubmitsetuptype: string = "APISubmitCriteria";
  workLoadDuration: string = "RadologistWorkloadDuration";
  profileImageUrl!: string;
  HospitalLogoToUpload: any;
  uploadedFilesForHospitalLogo: any[] = [];
  criteriaType: string;
  tabIndex = 0;
  activeTab = 0;
  onlyTime: Date = new Date();
  userLan: string = navigator.language;
  @ViewChild("imageReset") imageReset: any;
  //gblAddress: GblAddress = new GblAddress();
  packageList: Gblpackage[] = [];
  selectedPackage: Gblpackage = new Gblpackage();
  cols: any[] = [];
  displayInactiveReason: boolean = false;
  inactivedReason: string = "";
  hospitalContactList: GblEnvViewModel[] = [];
  siteList: SiteInformation[] = [];

  constructor(
    private orginfoService: OrgService,
    private _alertify: AlertifyService,
    private _siteService: SiteService,
    private _userService: UserService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnChanges(): void {
    this.criteriaType = "";
    this.tabIndex = 0;
    this.model = new Gblenv();
    this.fetchModel = new Gblenv();
    this.createForm();
    //this.loadAddressList();
    this.populateData(this.orgId);
    this.client = LocalStorageService.getUserStorageValue();
    this.getFilterHospitalList("Imaging");
    // if (this.client.OrgType == "SP") {
    //   this.GetAllImagingHospital();
    // }
    // else{
    //   if (this.client.OrgId > 0) {
    //     this.getOrgInfoMappingListByOrgId(this.client.OrgId, "Imaging");
    //   }
    // }
   
    // this.getrisSetupListByType(this.setuptype);
    // this.getrisApiSetupListByType(this.apisubmitsetuptype);
    // this.getrisWorkLoadDurationByType(this.workLoadDuration);
    this.imageReset?.clear();
  }

  ngOnInit(): void {
    this.criteriaType = "";

    this.authTypeList = [
      { label: "Post", value: "Post" },
      { label: "Get", value: "Get" },
    ];

    this.getPackageClos();
    this.getPackageList();

    this.orgTypeList = [
      { label: "Customer", value: "Customer" },
      { label: "Hospital", value: "Hospital" },
      { label: "SP", value: "SP" },
      { label: "Viewer", value: "Viewer" },
    ];
    this.signUpOrgTypeList = [
      { label: "Imaging", value: "Imaging" },
      { label: "Referring", value: "Referring" }
    ];

    this.apiSubmitScheduleList = [
      { label: "Day-1", value: 1 },
      { label: "Day-2", value: 2 },
      { label: "Day-3", value: 3 },
      { label: "Day-4", value: 4 },
      { label: "Day-5", value: 5 },
      { label: "Day-6", value: 6 },
      { label: "Day-7", value: 7 },
      { label: "Day-8", value: 8 },
      { label: "Day-9", value: 9 },
      { label: "Day-10", value: 10 },
      { label: "Day-11", value: 11 },
      { label: "Day-12", value: 12 },
      { label: "Day-13", value: 13 },
      { label: "Day-14", value: 14 },
      { label: "Day-15", value: 15 },
      { label: "Day-16", value: 16 },
      { label: "Day-17", value: 17 },
      { label: "Day-18", value: 18 },
      { label: "Day-19", value: 19 },
      { label: "Day-20", value: 20 },
      { label: "Day-21", value: 21 },
      { label: "Day-22", value: 22 },
      { label: "Day-23", value: 23 },
      { label: "Day-24", value: 24 },
      { label: "Day-25", value: 25 },
      { label: "Day-26", value: 26 },
      { label: "Day-27", value: 27 },
      { label: "Day-28", value: 28 },
      { label: "Day-29", value: 29 },
      { label: "Day-30", value: 30 },
      { label: "Day-31", value: 31 },
    ];

    this.addendumPosition = [
      { label: "Top", value: "T" },
      { label: "Bottom ", value: "B" },
    ];

    this.PatientTypes = [
      { label: "IPD", value: "IPD" },
      { label: "OPD", value: "OPD" },
    ];

    this.createForm();
    //this.loadAddressList();
    // this.getrisSetupListByType(this.setuptype);
    // this.getrisApiSetupListByType(this.apisubmitsetuptype);
    // this.getrisWorkLoadDurationByType(this.workLoadDuration);
    this.profileImageUrl = environment.defaultRadiologistImage;

    this.orginfoService.indexClickEvent$.subscribe((s) => {
      this.tabIndex = s;
    });
  }

  getPackageClos() {
    this.cols = [
      { field: "IsReporting", header: "Reporting" },
      { field: "IsScheduling", header: "Scheduling" },
      { field: "IsPatientPortal", header: "Patient Portal" },
      { field: "DataRetentionDay", header: "Data Retention" },
      { field: "AnalyticsType", header: "Analytics" },
      { field: "Rate", header: "" },
      { field: "Selected", header: "" },
    ];
  }

  close() {}

  packageSelected(gblpackage: Gblpackage) {
    if (this.model.PackageId > 0) {
      this.displayInactiveReason = true;
    }
    this.selectedPackage = gblpackage;
  }

  noPackage() {
    this.displayInactiveReason = false;
    this.selectedPackage = new Gblpackage();
    this.inactivedReason = "";
  }

  addpackage() {
    if (
      this.inactivedReason == "" ||
      this.inactivedReason == null ||
      this.inactivedReason == undefined
    ) {
      // this._alertify.("Please need your inactive reason.");
      return;
    }
    this.selectedPackage.InactivedReason = this.inactivedReason;
    this.displayInactiveReason = false;
  }

  getPackageList() {
    this._userService.getGblActivePackages().subscribe((data) => {
      if (data.IsSucceed) {
        this.packageList = data.Result as Gblpackage[];
      }
    });
  }

  showCriteriaInputField() {
    try {
      let criteriaId = this.formgroup.get("ApiSubmitCriteriaId").value;
      this.criteriaType = this.risSetupAPISubmitList.find(
        (e) => e.APISetupId == criteriaId
      )?.APISetupUId;
      this.somethingFieldMandatory();
    } catch (error) {}
  }

  getParentWorkflow() {
    try {
      if (this.fetchModel.ApiSubmitScheduleOn) {
        this.onlyTime = new Date(this.fetchModel.ApiSubmitScheduleOn);
      }
    
    } catch (error) {}
    this.criteriaType = this.risSetupAPISubmitList.find(
      (e) => e.APISetupId == this.fetchModel.ApiSubmitCriteriaId
    ).APISetupUId;
    this.formgroup.patchValue({
      DisplayStudyVersion: this.fetchModel.DisplayStudyVersion,
      IsOwnerMandatory: this.fetchModel.IsOwnerMandatory,
      StudyVersionCustomText: this.fetchModel.StudyVersionCustomText,
      // ApiSubmitScheduleOn :  this.fetchModel.ApiSubmitScheduleOn,
      ApiSubmitIntervalHour: this.fetchModel.ApiSubmitIntervalHour,
      ApiSubmitCriteriaId: this.fetchModel.ApiSubmitCriteriaId,
      AutoRefreshSecond: this.fetchModel.AutoRefreshSecond,
      AutoRefreshAllow: this.fetchModel.AutoRefreshAllow,
      AddendumPosition: this.fetchModel.AddendumPosition,
      ShowPatientNameToRad: this.fetchModel.ShowPatientNameToRad,
      SendPatientNameToPacs: this.fetchModel.SendPatientNameToPacs,
      DefaultPatientType: this.fetchModel.DefaultPatientType,
    });
  }

  getParentWorkflowForSubmitApiSettings() {
    this.formgroup.patchValue({
      UserName: this.fetchModel.UserName,
      Password: this.fetchModel.Password,
      AuthAPI: this.fetchModel.AuthAPI,
      AuthType: this.fetchModel.AuthType,
      SubmitAPI: this.fetchModel.SubmitAPI,
      SubmitAPIType: this.fetchModel.SubmitAPIType,
      BaseURL: this.fetchModel.BaseURL,
      ReceiveUserName: this.fetchModel.ReceiveUserName,
      ReceivePassword: this.fetchModel.ReceivePassword,
      ReceiveBaseURL: this.fetchModel.ReceiveBaseURL,
      ReceiveAPI: this.fetchModel.ReceiveAPI,
      ReceiveAPIType: this.fetchModel.ReceiveAPIType,
    });
  }

  getParentWorkflowForReceiveApiSettings() {
    this.formgroup.patchValue({
      ReceiveUserName: this.fetchModel.ReceiveUserName,
      ReceivePassword: this.fetchModel.ReceivePassword,
      ReceiveBaseURL: this.fetchModel.ReceiveBaseURL,
      ReceiveAPI: this.fetchModel.ReceiveAPI,
      ReceiveAPIType: this.fetchModel.ReceiveAPIType,
    });
  }

  somethingFieldMandatory() {
    if (this.criteriaType == "2") {
      this.formgroup
        .get("ApiSubmitScheduleOn")
        ?.setValidators([Validators.required]);
      this.formgroup.get("ApiSubmitScheduleOn")?.updateValueAndValidity();
      this.formgroup.get("ApiSubmitIntervalHour")?.setValidators([]);
      this.formgroup.get("ApiSubmitIntervalHour")?.updateValueAndValidity();
    } else if (this.criteriaType == "3") {
      this.formgroup.get("ApiSubmitIntervalHour")?.setValidators([Validators.required]);
      this.formgroup.get("ApiSubmitIntervalHour")?.updateValueAndValidity();
      this.formgroup.get("ApiSubmitScheduleOn")?.setValidators([]);
      this.formgroup.get("ApiSubmitScheduleOn")?.updateValueAndValidity();
    } else {
      this.formgroup.get("ApiSubmitIntervalHour")?.setValidators([]);
      this.formgroup.get("ApiSubmitIntervalHour")?.updateValueAndValidity();
      this.formgroup.get("ApiSubmitScheduleOn")?.setValidators([]);
      this.formgroup.get("ApiSubmitScheduleOn")?.updateValueAndValidity();
      this.formgroup.get("ApiSubmitScheduleDay")?.setValidators([]);
      this.formgroup.get("ApiSubmitScheduleDay")?.updateValueAndValidity();
    }
  }

  getParentPACS() {
    this.populatePACSData();
  }

  populatePACSData() {
    this.formgroup.patchValue({
      DCMViewer: this.fetchModel.DCMViewer,
      PacsIp: this.fetchModel.PacsIp,
      PacsPort: this.fetchModel.PacsPort,
      PacsUrl1: this.fetchModel.PacsUrl1,
      PacsUrl2: this.fetchModel.PacsUrl2,
      PacsUrl3: this.fetchModel.PacsUrl3,
      RisIp: this.fetchModel.RisIp,
      RisPort: this.fetchModel.RisPort,
      RisUser: this.fetchModel.RisUser,
      RisPass: this.fetchModel.RisPass,
      RisUrl: this.fetchModel.RisUrl,
      RisApiUrl: this.fetchModel.RisApiUrl,
      RisApiMethod: this.fetchModel.RisApiMethod,
      RisApiMethodType: this.fetchModel.RisApiMethodType,
      RemoteHL7IP: this.fetchModel.RemoteHL7IP,
      RemoteHL7Port: this.fetchModel.RemoteHL7Port,
      RemoteHL7Version: this.fetchModel.RemoteHL7Version,
      PacsAeTitle: this.fetchModel.PacsAeTitle,
      DeviceName: this.fetchModel.DeviceName,
      DeviceAeTitle: this.fetchModel.DeviceAeTitle,
      DeviceIp: this.fetchModel.DeviceIp,
      DevicePort: this.fetchModel.DevicePort,
      SenderAiTitle: this.fetchModel.SenderAiTitle,

      LocalPacsHost: this.fetchModel.LocalPacsHost,
      LocalPacsPort: this.fetchModel.LocalPacsPort,
      LocalPacsUsetls: this.fetchModel.LocalPacsUsetls,
      LocalPacsCallingae: this.fetchModel.LocalPacsCallingae,
      LocalPacsCalledae: this.fetchModel.LocalPacsCalledae,
      ApiSubmitScheduleDay: this.fetchModel.ApiSubmitScheduleDay,
    });
  }

  getParentOrgData() {
    let parentId = this.formgroup.get("OrgParentId")?.value;
    this.orginfoService.getGblEnvByParentId(parentId).subscribe((data) => {
      if (data.IsSucceed) {
        this.fetchModel = data.Result as Gblenv;
      }
    });
  }

  switchHeaders(tabNumber: any) {
    this.activeTab = tabNumber.index;
  }

  myUploaderForHospitalLogo(event:any): void {
    if (event.files.length === 0) {
      return;
    } else {
      this.HospitalLogoToUpload = event.files[0];
    }
  }

  onUploadHospitalLogo(event:any): void {
    for (const file of event.files) {
      this.uploadedFilesForHospitalLogo.push(file);
    }
  }

  // loadAddressList() {
  //   this.countryList = [];
  //   this._userService.getAddressList().subscribe((data) => {
  //     if (data.IsSucceed) {
  //       this.gblAddress = data.Result as GblAddress;
  //       this.countryList = this.gblAddress.CountryList;
  //     }
  //   });
  // }

  loadProvince() {
    let countryid = this.formgroup.get("CountryId")?.value;
    if (countryid) {
      this.provinceList = this.gblAddress.ProvinceList.filter(
        (f) => f.CountryId == countryid
      );
    }
  }

  loadDistrict() {
    let provinceid = this.formgroup.get("ProvinceId")?.value;
    if (provinceid) {
      this.districtList = this.gblAddress.DistrictList.filter(
        (f) => f.ProvinceId == provinceid
      );
    }
  }

  loadSubDistrict() {
    let districtId = this.formgroup.get("DistrictId")?.value;
    if (districtId) {
      this._userService
        .getSubDistrictList(districtId)
        .subscribe((x) => {
          if (x) {
            this.subDistrictList = x;
          }
        })
        .add(() => {
          if (this.districtList.length > 0) {
            this.loadPostalCodesByDistricId(districtId);
          }
        });
    }
  }

  loadPostalCodesByDistricId(districtId: number) {
    this._userService
      .getPostalCodesByDistricId(districtId)
      .subscribe((res: GeneralResModel<GblPostalCode[]>) => {
        if (res.IsSucceed) {
          this.postalCodeList = res.Result as GblPostalCode[];
        }
      });
  }

  autoRefreshRequired() {
    if (this.formgroup.get("AutoRefreshAllow")?.value) {
      this.formgroup
        .get("AutoRefreshSecond")?.setValidators([Validators.required]);
      this.formgroup.get("AutoRefreshSecond")?.updateValueAndValidity();
    } else {
      this.formgroup.get("AutoRefreshSecond")?.setValidators([]);
      this.formgroup.get("AutoRefreshSecond")?.updateValueAndValidity();
    }
  }

  
  ImagingHospitalRequired() {
  
    if (this.formgroup.get("SignupOrgtype")?.value=='Referring') {
      this.formgroup
        .get("OrgidDefaultimaging")?.setValidators([Validators.required]);
      this.formgroup.get("OrgidDefaultimaging")?.updateValueAndValidity();
    } else {
      this.formgroup.get("OrgidDefaultimaging")?.setValidators([]);
      this.formgroup.get("OrgidDefaultimaging")?.updateValueAndValidity();
    }
  }

  cancel() {
    this.tabIndex = 0;
    this.response.emit(true);
  }

  populateData(orgId: number) {
    this.profileImageUrl = environment.defaultRadiologistImage;
    this.selectedPackage = new Gblpackage();
    if (orgId > 0) {
      this.orginfoService.getGblEnvById(orgId).subscribe((data) => {
        if (data.IsSucceed) {
          this.model = data.Result as Gblenv;
          this.selectedPackage.PackageId = this.model.PackageId;
          this.selectedPackage.PackageName = this.model.PackageName;
          this.selectedPackage.ActiveDate = this.model.ActiveDate;
          this.selectedPackage.NextBillingDate = this.model.NextBillingDate;
          this.selectedPackage.InactivedReason = this.model.InactivedReason;
          this.onlyTime =
            this.model.ApiSubmitScheduleOn != null
              ? new Date(this.model.ApiSubmitScheduleOn)
              : new Date();
          this.formgroup.patchValue({
            OrgId: this.model.OrgId,
            ShowPatientNameToRad: this.model.ShowPatientNameToRad,
            SendPatientNameToPacs: this.model.SendPatientNameToPacs,
            DCMViewer: this.model.DCMViewer,
            OrgParentId: this.model.OrgParentId,
            OrgWebsite: this.model.OrgWebsite,
            OrgType: this.model.OrgType,
            OrgName: this.model.OrgName,
            OrgEmail1: this.model.OrgEmail1,
            LineId: this.model.LineId,
            OrgSuffix: this.model.OrgSuffix,
            OrgPrefix: this.model.OrgPrefix,
            OrgTel1: this.model.OrgTel1,
            CountryId: this.model.CountryId,
            ProvinceId: this.model.ProvinceId,
            SubdistrictId: this.model.SubdistrictId,
            DistrictId: this.model.DistrictId,
            PostalCodeId: this.model.PostalCodeId,
            OrgAddr1: this.model.OrgAddr1,
            Hcode: this.model.Hcode,
            Hospmain: this.model.Hospmain,
            HospSub: this.model.HospSub,
            GovCode: this.model.GovCode,
            GovName: this.model.GovName,
            PermitNo: this.model.PermitNo,
            HType: this.model.HType,
            HTypeId: this.model.HTypeId,
            DefaultPatientType: this.model.DefaultPatientType,
            PacsAeTitle: this.model.PacsAeTitle,
            DeviceName: this.model.DeviceName,
            DeviceAeTitle: this.model.DeviceAeTitle,
            DeviceIp: this.model.DeviceIp,
            DevicePort: this.model.DevicePort,
            SenderAiTitle: this.model.SenderAiTitle,

            RemoteHL7IP: this.model.RemoteHL7IP,
            RemoteHL7Port: this.model.RemoteHL7Port,
            PacsIp: this.model.PacsIp,
            PacsPort: this.model.PacsPort,
            PacsUrl1: this.model.PacsUrl1,
            PacsUrl2: this.model.PacsUrl2,
            PacsUrl3: this.model.PacsUrl3,

            LocalPacsHost: this.model.LocalPacsHost,
            LocalPacsPort: this.model.LocalPacsPort,
            LocalPacsUsetls:
              this.model.LocalPacsUsetls == null
                ? false
                : this.model.LocalPacsUsetls,
            LocalPacsCallingae: this.model.LocalPacsCallingae,
            LocalPacsCalledae: this.model.LocalPacsCalledae,

            RisIp: this.model.RisIp,
            RisPort: this.model.RisPort,
            RisUser: this.model.RisUser,
            RisPass: this.model.RisPass,
            RisUrl: this.model.RisUrl,
            RisApiUrl: this.model.RisApiUrl,
            RisApiMethod: this.model.RisApiMethod,
            RisApiMethodType: this.model.RisApiMethodType,
            AddendumPosition: this.model.AddendumPosition,
            RemoteHL7Version: this.model.RemoteHL7Version,
            DisplayStudyVersion: this.model.DisplayStudyVersion,
            IsOwnerMandatory: this.model.IsOwnerMandatory,
            StudyVersionCustomText: this.model.StudyVersionCustomText,

            ApiSubmitScheduleDay: this.model.ApiSubmitScheduleDay,
            ApiSubmitScheduleOn: this.model.ApiSubmitScheduleOn,
            ApiSubmitIntervalHour: this.model.ApiSubmitIntervalHour,
            ApiSubmitCriteriaId: this.model.ApiSubmitCriteriaId,
            AutoRefreshSecond: this.model.AutoRefreshSecond,
            AutoRefreshAllow: this.model.AutoRefreshAllow,
            RadologistWorkloadDuration: this.model.RadologistWorkloadDuration,
            RadologistFinalizedDuration: this.model.RadologistFinalizedDuration,
            SessionActiveSecond: this.model.SessionActiveSecond,
            ReSubmitAllow: this.model.ReSubmitAllow,

            BaseURL: this.model.BaseURL,
            UserName: this.model.UserName,
            Password: this.model.Password,
            AuthAPI: this.model.AuthAPI,
            AuthType: this.model.AuthType,
            SubmitAPI: this.model.SubmitAPI,
            SubmitAPIType: this.model.SubmitAPIType,

            ReceiveBaseURL: this.model.ReceiveBaseURL,
            ReceiveUserName: this.model.ReceiveUserName,
            ReceivePassword: this.model.ReceivePassword,
            ReceiveAPI: this.model.ReceiveAPI,
            ReceiveAPIType: this.model.ReceiveAPIType,
            IshideOrgtype: this.model.IshideOrgtype,
            SignupOrgtype: this.model.SignupOrgtype,
            OrgidDefaultimaging: this.model.OrgidDefaultimaging,
            SubmitLevel: this.model.SubmitLevel,
            IsSsnmandatory: this.model.IsSsnmandatory,
            IsStudyautosubmit: this.model.IsStudyautosubmit,
          });

          this.getParentOrgList(this.model.OrgType);
          this.loadProvince();
          this.loadDistrict();
          this.loadSubDistrict();
          this.getParentOrgData();
          this.showCriteriaInputField();
        }
      });
    }
  }

  approveOrgInfo() {
    this.model = this.formgroup.value as Gblenv;

    if (this.model.PostalCodeId != null && this.postalCodeList?.length) {
      const selectedPostalCode = this.postalCodeList.find(x => x.PostalCodeId === this.model.PostalCodeId);
      if (selectedPostalCode) {
        this.model.ZipCode = +selectedPostalCode.PostalCode;
      }
    }
    

    this.model.IsApproved = true;
    this.confirmationService.confirm({
      key: "ApprovedOrgInfo",
      message: "Do you want to approve?",
      accept: () => {
        if (this.orgId > 0) {
          this.model.LastModifiedBy = this.client.OrgId;
          this.orginfoService.approveGblEnv(this.model).subscribe(
            (data) => {
              if (data.IsSucceed) {
                this.response.emit(true);
                this._alertify.success("Org info Approved Successfully.");
              } else {
                this._alertify.error(data.Message);
              }
            },
            (error) => {
              console.error(error);
              this._alertify.error(error.Message);
            }
          );
        }
      },
      reject: () => {
        // console.log("finalize Rejected");
        return;
      },
    });
  }

  addUpdate() {
    this.model = this.formgroup.value as Gblenv;
    if (this.model.PostalCodeId != null && this.model.PostalCodeId != undefined) {
      const postalCodeItem = this.postalCodeList.find(x => x.PostalCodeId === this.model.PostalCodeId);
      if (postalCodeItem) {
        this.model.ZipCode = +postalCodeItem.PostalCode;
      }
    }
    
if (this.onlyTime) {
  
  this.model.ApiSubmitScheduleOn = new Date(this.onlyTime);
}

    this.model.PackageId = this.selectedPackage.PackageId;
    this.model.Rate = Number(this.selectedPackage.Rate);
    this.model.InactivedReason = this.selectedPackage.InactivedReason;
    if (this.orgId == 0) {
      this.model.IsApproved = true;
      this.model.CreatedBy = this.client.EmpId;
      if (this.model.LocalPacsUsetls == null) {
        this.model.LocalPacsUsetls = false;
      }
      this.orginfoService.addGblEnv(this.model).subscribe(
        (data) => {
          if (data.IsSucceed) {
            this.model = data.Result as Gblenv;
            if (this.HospitalLogoToUpload != null) {
              this.uploadLogo(this.model.OrgId);
            }
            this.response.emit(true);
            this.formgroup.reset();
            this.createForm();
            this._alertify.success("Org info Added Successfully.");
          } else {
            this._alertify.error(data.Message);
          }
        },
        (error) => {
          // this._alertify.error(error.Message);
        }
      );
    } else {
      if (
        this.model.IsImaging &&
        (this.selectedPackage == null || this.selectedPackage.PackageId == 0)
      ) {
        // this._alertify.error("Please Selecte at Least Package Select");
        return;
      }
      this.model.LastModifiedBy = this.client.EmpId;
      this.orginfoService.updateGblEnv(this.model).subscribe(
        (data) => {
          if (data.IsSucceed) {
            if (this.HospitalLogoToUpload != null) {
              this.uploadLogo(this.orgId);
            }
            this.response.emit(true);
            // this._alertify.success("Org info Updated Successfully.");
          } else {
            // this._alertify.error(data.Message);
          }
        },
        (error) => {
          console.error(error);
          // this._alertify.error(error.Message);
        }
      );
    }
  }

  uploadLogo(orgid: number) {
    console.log("this.HospitalLogoToUpload: ", this.HospitalLogoToUpload);
    let hospitalLogo = new FormData();
    hospitalLogo.append("LogoFile", this.HospitalLogoToUpload);
    hospitalLogo.append("OrgId", orgid.toString());
    this.orginfoService.postLogo(hospitalLogo).subscribe(
      (data) => {
        if (data.IsSucceed) {
          this.HospitalLogoToUpload = null;
        } else {
          // this._alertify.error(data.Message);
        }
      },
      (error) => {
        // console.error(error);
        // this._alertify.error(error.Message);
      }
    );
  }

  getParentOrgList(OrgType?: string) {
    let orgType = this.formgroup.get("OrgType")?.value;
    var filtOrgType = "";
    if (orgType == null) {
      orgType = OrgType;
    }
    if (orgType == "SP") {
      this.parentOrgList = [];
      this.formgroup.get("OrgParentId")?.setValidators([]);
    } else {
      this.formgroup.get("OrgParentId")?.setValidators([Validators.required]);
    }
    this.formgroup.get("OrgParentId")?.updateValueAndValidity();

    if (orgType == "Hospital" || orgType == "Viewer") {
      filtOrgType = "Customer";
    }
    if (orgType == "Customer") {
      filtOrgType = "SP";
    }

    if (filtOrgType != "") {
      this.orginfoService.getParentOrg(filtOrgType).subscribe((data) => {
        if (data.IsSucceed) {
          this.parentOrgList = data.Result as Parentorginfo[];
        }
      });
    }
  }

  createForm() {
    this.formgroup = this.formBuilder.group({
      OrgId: [0],
      RadologistWorkloadDuration: [""],
      RadologistFinalizedDuration: [""],
      DCMViewer: ["PACS"],
      ShowPatientNameToRad: [false],
      SendPatientNameToPacs: [false],
      OrgParentId: [0, [Validators.required]],
      OrgWebsite: [],
      OrgType: ["", [Validators.required]],
      OrgName: ["", [Validators.required]],
      OrgEmail1: [],
      LineId: [],
      OrgPrefix: [],
      OrgSuffix: [],
      CountryId: [],
      ProvinceId: [],
      SubdistrictId: [],
      DefaultPatientType: [],
      DistrictId: [],
      PostalCodeId: [],
      ZipCode: [],
      OrgAddr1: [],
      OrgTel1: [],
      Hcode: [],
      Hospmain: [],
      HospSub: [],
      GovCode: [],
      GovName: [],
      PermitNo: [],
      HTypeId: [],

      BaseURL: [],
      UserName: [],
      Password: [],
      AuthAPI: [],
      AuthType: [],
      SubmitAPI: [],
      SubmitAPIType: [],

      ReceiveBaseURL: [],
      ReceiveUserName: [],
      ReceivePassword: [],
      ReceiveAPI: [],
      ReceiveAPIType: [],

      DeviceName: [],
      DeviceAeTitle: [],
      DeviceIp: [],
      DevicePort: [],
      SenderAiTitle: [],
      PacsAeTitle: [],
      PacsUrl1: [],
      PacsUrl2: [],
      PacsUrl3: [],
      PacsIp: [],
      PacsPort: [],
      RemoteHL7IP: [],
      RemoteHL7Port: [],
      RemoteHL7Version: [],
      RisApiUrl: [],
      RisApiMethod: [],
      RisApiMethodType: [],
      RisIp: [],
      RisPort: [],
      RisUser: [],
      RisPass: [],
      RisUrl: [],
      AddendumPosition: [],
      DisplayStudyVersion: [false],
      IsOwnerMandatory: [true],
      StudyVersionCustomText: [],
      AutoRefreshAllow: [false],
      AutoRefreshSecond: [],
      ApiSubmitCriteriaId: [""],
      ApiSubmitIntervalHour: [],
      ApiSubmitScheduleOn: [],
      ApiSubmitScheduleDay: [],
      ReSubmitAllow: [],
      SessionActiveSecond: [],

      LocalPacsHost: [],
      LocalPacsPort: [],
      LocalPacsUsetls: [false],
      LocalPacsCallingae: [],
      LocalPacsCalledae: [],
      IshideOrgtype: [false],
      SignupOrgtype: [""],
      OrgidDefaultimaging: [],
      SubmitLevel: [""],
      IsSsnmandatory: [false],
      IsStudyautosubmit: [false],
    });
  }

  // getrisApiSetupListByType(type: string) {
  //   this.studyOrderSubmitService
  //     .getRisAPISetUpListByType(type)
  //     .subscribe((data) => {
  //       if (data.IsSucceed) {
  //         this.risSetupAPISubmitList = data.Result as RisSetup[];
  //       }
  //     });
  // }

  // getrisWorkLoadDurationByType(type: string) {
  //   this.studyOrderSubmitService
  //     .getRisAPISetUpListByType(type)
  //     .subscribe((data) => {
  //       if (data.IsSucceed) {
  //         this.workLoadDurationList = data.Result as RisSetup[];
  //       }
  //     });
  // }

  // getrisSetupListByType(type: string) {
  //   this.studyOrderSubmitService
  //     .getRisAPISetUpListByType(type)
  //     .subscribe((data) => {
  //       if (data.IsSucceed) {
  //         this.risSetupList = data.Result as RisSetup[];
  //       }
  //     });
  // }

  private getOrgInfoMappingListByOrgId(orgId: number, type: string) {
    this.orginfoService
      .getOrgInfoMappingListByOrgId(orgId, type)
      .subscribe((res: GeneralResModel<GblEnvViewModel[]>) => {
        if (res.IsSucceed) {
          this.hospitalContactList = res.Result as GblEnvViewModel[];
        }
      });
  }
  private GetAllImagingHospital() {
    this.orginfoService
      .getAllImagingHospital()
      .subscribe((res: GeneralResModel<GblEnvViewModel[]>) => {
        if (res.IsSucceed) {
          this.hospitalContactList = res.Result as GblEnvViewModel[];
        }
      });
  }
  private getFilterHospitalList(type: string) {
    this._siteService
      .getFilterHospitalList(type)
      .subscribe((res: GeneralResModel<SiteInformation[]>) => {
        if (res.IsSucceed) {
          this.siteList = res.Result;
        }
      });
  }
}