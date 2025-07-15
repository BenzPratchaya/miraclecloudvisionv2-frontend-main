import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import {UserListViewModel } from 'src/app/core/models/settings/UserListViewModel';
import { UserService } from 'src/app/core/services/settings/user.service';
import { GeneralResModel, User } from 'src/app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HrEmpdocument } from 'src/app/core/models/user-models/HrEmpdocument';
import { OrderDocumentTypeResModel } from 'src/app/core/models/order-document/order-document-type-res.model';
import { SiteInformation } from 'src/app/core/models/settings/site-information';
import { Observable, Subject, debounceTime, switchMap, takeUntil } from 'rxjs';
import { Jobtype } from 'src/app/core/models/JobTypes/jobtype.model';
import { JobtypeLevel } from 'src/app/core/models/JobTypes/jobtype-level.model';
import { Gblenv } from 'src/app/core/models/settings/orginfos/gblenv.model';
import { HrSubspecialty } from 'src/app/core/models/settings/radiologist-signup/HrSubspecialty';
import { GblCountry } from 'src/app/core/models/settings/radiologist-signup/GblCountry';
import { GblDistrict } from 'src/app/core/models/settings/radiologist-signup/GblDistrict';
import { GblProvince } from 'src/app/core/models/settings/radiologist-signup/GblProvince';
import { GblSubdistrict } from 'src/app/core/models/settings/radiologist-signup/GblSubdistrict';
import { GblPostalCode } from 'src/app/core/models/settings/radiologist-signup/GblPostalCode';
import { environment } from 'src/environments/environment';
import { JobtypeService } from 'src/app/core/services/jobtypes/jobtype.service';
import { AlertifyService, OrgService } from 'src/app/core/services';
import { trimValidator } from 'src/app/core/validators/trim.validator';
import { nameValidator } from 'src/app/core/validators/name.validator';
import { phoneNumberValidator } from 'src/app/core/validators/phoneNumber.validator';
import { emailValidator } from 'src/app/core/validators';
import { LocalStorageService } from 'src/app/core/services/common/storage/local-storage.service';
import { emailPatternValidator } from 'src/app/core/validators/emailPatternValidator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  implements OnInit {

  @ViewChild("dt2", { static: true }) dt: Table;
  @ViewChild('filter') filter!: ElementRef;
  loading: boolean = true;
  cols: any[];
  dateFiltersCreatedOn: any;
  submitted: boolean = false;
  userInfoConfirm: boolean = false;
  approveUserHeader: boolean = false;
  hide: boolean = false;
  status: any[];
  selectedStatus: string;
  userList: UserListViewModel[];
  selectedColumns: any[];
  newUser: User;
  documentFile: any;
  selecetdInput: any;
  userDocumet: HrEmpdocument = new HrEmpdocument();
  selectedDocumentType: OrderDocumentTypeResModel;
  documentTypedDopdownItems: OrderDocumentTypeResModel[] = [];
  userForm: FormGroup;
  site = {} as SiteInformation;
  emailExists: boolean = true;
  showSpinner: boolean = false;
  selectedUser: UserListViewModel = new UserListViewModel();
  one = 0;
  client: User;
  userValueSendForChild: UserListViewModel;
  searchText$: Observable<string>;
  searchTextSubject$ = new Subject<string>();
  public userEnty: User = new User();
  public newUserForm: FormGroup;
  public displayAddUserPopUp = false;
  public addUserPopUpHeader = "";
  public saveText = "";
  destroy$: Subject<boolean> = new Subject<boolean>();
  userTypes: Jobtype[];
  userTypesforadd: Jobtype[]=[];
  userLevels: JobtypeLevel[];
  userStatus: any;
  userTypeStatus: any;
  countryType: any;
  isViewer: boolean = false;
  orgList: Gblenv[] = [];
  SubSpecialtyList: HrSubspecialty[];
  selectedSubSpecialty: HrSubspecialty[] = [];
  singleSubSpecialty: HrSubspecialty;
  countryList: GblCountry[] = [];
  selectedCountry: GblCountry;
  selectedDistrict: GblDistrict;
  districtList: GblDistrict[];
  selectedProvince: GblProvince;
  ProvinceList: GblProvince[] = [];
  selectedSubDistrict: GblSubdistrict;
  SubDistrictList: GblSubdistrict[];
  countryDropDown: GblCountry;
  orgTypeList: any[];
  selectedOrgType: any;
  isOnLoad: boolean = true;
  tempOrgList: Gblenv[];
  selectedOrganization: any;
  selectedOrganizationForUpdateUser: any;
  selectedOrg: Gblenv;
  isVisibleSubspeciality: boolean = false;
  isVisibleUserLevel: boolean = false;
  selectedUserLevel: JobtypeLevel;
  postalCodeList: GblPostalCode[];
  selectedZipCode: GblPostalCode;
  selectedZipCodeId: number;
  selectedPostalCode: string;
  prorileUrl: string;
  profileImagerUrl = environment.profileImagerUrl;

  constructor(
    private _jobtypeService: JobtypeService,
    private _cdref: ChangeDetectorRef,
    private userService: UserService,
    private _orgInfoService: OrgService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addUserFormControl();
    this.newUser = new User();
    this.newUser.hrEmpdocuments = [];
    this.loadSubspecialist();
    this.getCountryList();

    try {
      this.cols = [
        { field: "FullName", header: "Full Name" },
        { field: "EmailOfficial", header: "Email" },
        { field: "OrgName", header: "Org Name" },
        { field: "OrgType", header: "Org Type" },
        { field: "ParentOrgName", header: "Parent Org" },
        { field: "HospitalType", header: "Hospital Type" },
        { field: "PhoneMobileCode", header: "Mobile No" },
        // { field: "PhoneMobileCode", header: "Mobile Code" },
        { field: "CreatedOn", header: "Created On" },
        { field: "Status", header: "Status" },
        { field: "JobTypeName", header: "Role Name" },
      ];

      this._jobtypeService.getActiveJobTypes().subscribe((data) => {
        if (data.IsSucceed) {
          this.userTypes = data.Result as Jobtype[];
        }
      });

      this._jobtypeService.getActiveJobTypes().subscribe((data) => {
        if (data.IsSucceed) {
          this.userTypesforadd = data.Result as Jobtype[];
          this.userTypesforadd = this.userTypesforadd.filter(
            (e) => e.JobTypeId != 2 && e.JobTypeId != 6
          );
        }
      });

      this.client = LocalStorageService.getUserStorageValue();
      this.selectedColumns = this.cols;
      this.getUserListByOrgId(this.client.OrgId);

      this.userForm = this.formBuilder.group({
        fullName: [""],
        phoneNo: [""],
        email: [""],
        status: [""],
      });

      this.status = [
        { label: "Approve", value: "A" },
        { label: "Pending", value: "P" },
        { label: "Delete", value: "D" },
      ];

      this.loadOrganization();
      this.loadOrgTypeList();
    } catch (error) {
      throw error;
    }

    this.documentTypedDopdownItems = [
      { name: "NID", code: "NID" },
      { name: "Passport", code: "Passport" },
      { name: "Medical License", code: "Medical License" },
      { name: "Others", code: "Others" },
    ];
  }

  onchangeUserRoleForPenDingOrUpDate() {
    let userRole = this.userTypeStatus?.JobTypeUid;
    let jobTypeID = this.userTypeStatus?.JobTypeId;
    let orgId = this.selectedOrganizationForUpdateUser.OrgId;
    this._jobtypeService
      .getActiveJobTypeLevels(jobTypeID) // .getUserLevelByFilter(jobTypeID, orgId)
      .subscribe((data) => {
        if (data.IsSucceed) {
          this.userLevels = data.Result as JobtypeLevel[];
          if (this.userLevels.length > 0) {
            this.isVisibleUserLevel = true;
          } else {
            this.isVisibleUserLevel = false;
          }
        }
      });

    if (userRole == "D") {
      this.isVisibleUserLevel = true;
      this.isVisibleSubspeciality = true;
    } else {
      this.isVisibleSubspeciality = false;
      this.selectedSubSpecialty = [];
    }
  }

  onchangeUserRole() {
    let userRole = this.newUserForm.get("userRole").value.JobTypeUid;
    let jobTypeID = this.newUserForm.get("userRole").value.JobTypeId;
    let orgId = this.newUserForm.get("Organization").value;
    this._jobtypeService
      .getActiveJobTypeLevels(jobTypeID) // .getUserLevelByFilter(jobTypeID, orgId)
      .subscribe((data) => {
        if (data.IsSucceed) {
          this.userLevels = data.Result as JobtypeLevel[];
          if (this.userLevels.length > 0) {
            this.isVisibleUserLevel = true;

            this.newUserForm
              .get("userLevel")
              .setValidators([Validators.required]);
            this.newUserForm.get("userLevel").updateValueAndValidity();

            if (this.selectedUserLevel == null) {
              //this.isVisibleUpdateUserButton = false;
            }
          } else {
            this.isVisibleUserLevel = false;
            this.newUserForm.get("userLevel").setValidators([]);
            this.newUserForm.get("userLevel").updateValueAndValidity();
          }
        }
      });

    // if (userRole == "D") {
    //   this.isVisibleSubspeciality = true;
    //   this.newUserForm.get("subSpecialty").setValidators([Validators.required]);
    //   this.newUserForm.get("subSpecialty").updateValueAndValidity();
    // } else {
    //   this.newUserForm.get("subSpecialty").setValidators([]);
    //   this.newUserForm.get("subSpecialty").updateValueAndValidity();
    //   this.isVisibleSubspeciality = false;
    //   this.newUserForm.get("subSpecialty").reset();
    // }
  }

  onClearUserRole() {
    this.isVisibleSubspeciality = false;
    this.newUserForm.get("subSpecialty").reset();
    this.isVisibleUserLevel = false;
    this.userLevels = [];
  }

  onClearUserRoleForPenDingOrUpDate() {
    this.isVisibleSubspeciality = false;
    this.selectedSubSpecialty = [];
    this.isVisibleUserLevel = false;
    this.selectedUserLevel = null;
  }

  onClearJobTypeLevelForPenDingOrUpDate() {
    this.selectedUserLevel = null;
  }

  setPatchValueForNewUserForm() {
    this.selectedOrgType = this.orgTypeList.find(
      (x) => x.value == this.client.OrgType
    );

    this.selectedOrganization = this.orgList.find(
      (x) => x.OrgName.trim() == this.client.OrgName.trim()
    );
    this.newUserForm.patchValue({
      OrgType: this.selectedOrgType.value,
    });
    console.log("  OrgName", this.selectedOrganization);
    this.newUserForm.patchValue({
      Organization: this.selectedOrganization?.OrgId,
    });
  }

  loadOrgTypeList() {
    if (this.client.OrgType == "SP") {
      this.orgTypeList = [
        { label: "SP", value: "SP" },
        { label: "Customer", value: "Customer" },
        { label: "Hospital", value: "Hospital" },
        { label: "Viewer", value: "Viewer" },
      ];
    }

    if (this.client.OrgType == "Customer") {
      this.orgTypeList = [
        { label: "Customer", value: "Customer" },
        { label: "Hospital", value: "Hospital" },
        { label: "Viewer", value: "Viewer" },
      ];
    }

    if (this.client.OrgType == "Hospital") {
      this.orgTypeList = [
        { label: "Hospital", value: "Hospital" },
        { label: "Viewer", value: "Viewer" },
      ];
    }

    if (this.client.OrgType == "Viewer") {
      this.orgTypeList = [{ label: "Viewer", value: "Viewer" }];
    }
  }

  onClearOrgType() {
    this.orgList = null;
  }

  getUserListByOrgId(orgId) {
    this.userService
      .getUserAfterVerification(orgId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          console.log("data of userList", data);
          this.userList = data;
          this.selectedUser = data[0];
        }
      });
  }

  onchangeJobTypeLevelForPenDingOrUpDate() {
    if (this.selectedUserLevel != null) {
      //this.isVisibleUpdateUserButton =true;
    }
  }

  openPendingModal(rowData: UserListViewModel) {
    this.postalCodeList = [];
    this.selectedZipCode = null;
    this.userValueSendForChild = rowData;

    if (rowData != null) {
      if (
        rowData.ImgFileName !== null &&
        rowData.ImgFileName !== "" &&
        rowData.ImgFileName !== "undefined"
      ) {
        this.prorileUrl =
          this.profileImagerUrl + rowData.EmpId + "/" + rowData.ImgFileName;
      } else {
        this.prorileUrl = "assets/layout/images/default-img/no_image.png";
      }
    }

    this.loadOrgTypeList();
    this.userService.getAllOrgListByOrgId(this.client.OrgId).subscribe((x) => {
      if (x.IsSucceed) {
        this.tempOrgList = x.Result as Gblenv[];
        this.orgList = this.tempOrgList.filter(
          (x) => x.OrgType == rowData.OrgType
        );
      }
    });

    this.selectedUser = rowData;

    this.userForm.patchValue({
      zipCode: this.selectedUser.ZipCode,
      SubdistrictId: this.selectedUser.SubdistrictId,
    });

    this.selectedPostalCode = this.selectedUser.ZipCode;

    this.userStatus = this.status.find((e) => e.value == rowData.Status);
    this.userTypeStatus = this.userTypes.find(
      (e) => e.JobTypeUid == rowData?.JobTypeUid
    );

    this._jobtypeService
      .getActiveJobTypeLevels(rowData.JobTypeId) //getUserLevelByFilter(rowData.JobTypeId, rowData.OrgId)
      .subscribe((data) => {
        if (data.IsSucceed) {
          this.userLevels = data.Result as JobtypeLevel[];
          this.selectedUserLevel = this.userLevels.find(
            (x) => x.JobTypeLevelId == rowData.JobTypeLevelId
          );
          if (this.userLevels.length > 0) {
            this.isVisibleUserLevel = true;
            // this.newUserForm.get('userLevel').setValidators([Validators.required]);
            // this.newUserForm.get('userLevel').updateValueAndValidity();
          } else {
            this.isVisibleUserLevel = false;
            // this.newUserForm.get('userLevel').setValidators([]);
            // this.newUserForm.get('userLevel').updateValueAndValidity();
          }
        }
      });

    if (this.userTypeStatus.JobTypeUid == "D") {
      this.isVisibleSubspeciality = true;
    } else {
      this.isVisibleSubspeciality = false;
    }

    rowData.SubSpecialityId.forEach((x) => {
      this.singleSubSpecialty = this.SubSpecialtyList.find(
        (p) => p.SubspecialtyId == x
      );
      if (this.singleSubSpecialty != null) {
        this.selectedSubSpecialty.push(this.singleSubSpecialty);
      }
    });
    if (rowData.CountryId != null) {
      this.selectedCountry = this.countryList.find(
        (e) => e.CountryId == rowData.CountryId
      );

      if (this.selectedCountry != null) {
        this.userService
          .getProvinceList(this.selectedCountry.CountryId)
          .subscribe((res: GblProvince[]) => {
            this.ProvinceList = res;
            if (this.ProvinceList?.length > 0) {
              this.selectedProvince = this.ProvinceList.find(
                (x) => x.ProvinceId == rowData.ProvinceId
              );
            }
            if (this.selectedProvince != null) {
              this.userService
                .getDistrictList(this.selectedProvince.ProvinceId)
                .subscribe((x) => {
                  if (x) {
                    this.districtList = x;
                    if (this.districtList.length > 0) {
                      this.selectedDistrict = this.districtList.find(
                        (x) => x.DistrictId == rowData.DistrictId
                      );
                    }
                    if (this.selectedDistrict != null) {
                      this.userService
                        .getSubDistrictList(this.selectedDistrict.DistrictId)
                        .subscribe((x) => {
                          if (x) {
                            this.SubDistrictList = x;
                            if (this.SubDistrictList.length > 0) {
                              this.selectedSubDistrict =
                                this.SubDistrictList.find(
                                  (x) =>
                                    x.SubdistrictId == rowData.SubdistrictId
                                );
                            }
                          }
                        })
                        .add(() => {
                          this.userService
                            .getPostalCodesByDistricId(
                              this.selectedDistrict.DistrictId
                            )
                            .subscribe(
                              (res: GeneralResModel<GblPostalCode[]>) => {
                                if (res.IsSucceed) {
                                  this.postalCodeList = res.Result;

                                  if (this.postalCodeList.length > 0) {
                                    this.selectedZipCode =
                                      this.postalCodeList.find(
                                        (x) => x.PostalCode == rowData.ZipCode
                                      );
                                  }
                                }
                              }
                            );
                        });
                    }
                  }
                });
            }
          });
      }
    }

    this.selectedOrgType = this.orgTypeList.find(
      (x) => x.value == rowData.OrgType
    );
    this.orgList = this.tempOrgList.filter(
      (x) => x.OrgType == this.selectedOrgType.OrgType
    );

    this.selectedOrganizationForUpdateUser = this.tempOrgList.find(
      (x) => x.OrgId == rowData.OrgId
    );
    this.approveUserHeader = true;
    this.userInfoConfirm = true;
  }

  private loadPostalCodesByDistricId(districtId: number) {
    this.userService
      .getPostalCodesByDistricId(districtId)
      .subscribe((res: GeneralResModel<GblPostalCode[]>) => {
        if (res.IsSucceed) {
          this.postalCodeList = res.Result;
        }
      });
  }

  openUserUpdateModal(rowData: UserListViewModel) {
    // this.postalCodeList = [];
    // this.selectedZipCode = null;
    this.approveUserHeader = false;
    this.userValueSendForChild = rowData;
    this.loadOrgTypeList();

    if (rowData != null) {
      if (
        rowData.ImgFileName !== null &&
        rowData.ImgFileName !== "" &&
        rowData.ImgFileName !== "undefined"
      ) {
        this.prorileUrl =
          this.profileImagerUrl + rowData.EmpId + "/" + rowData.ImgFileName;
      } else {
        this.prorileUrl = "assets/layout/images/default-img/no_image.png";
      }
    }

    this.userService.getAllOrgListByOrgId(this.client.OrgId).subscribe((x) => {
      if (x.IsSucceed) {
        this.tempOrgList = x.Result as Gblenv[];
        this.orgList = this.tempOrgList.filter(
          (x) => x.OrgType == rowData.OrgType
        );
      }
    });

    this.hide = true;
    this.selectedUser = rowData;
    this.userStatus = this.status.find((e) => e.value == rowData.Status);
    this.userTypeStatus = this.userTypes.find(
      (e) => e.JobTypeUid == rowData.JobTypeUid
    );

    this._jobtypeService
      .getActiveJobTypeLevels(rowData.JobTypeId) //getUserLevelByFilter(rowData.JobTypeId, rowData.OrgId)
      .subscribe((data) => {
        if (data.IsSucceed) {
          this.userLevels = data.Result as JobtypeLevel[];
          this.selectedUserLevel = this.userLevels.find(
            (x) => x.JobTypeLevelId == rowData.JobTypeLevelId
          );

          if (this.userLevels.length > 0) {
            this.isVisibleUserLevel = true;

            if (this.selectedUserLevel == null) {
              //this.isVisibleUpdateUserButton =false;
            }
          } else {
            this.isVisibleUserLevel = false;
          }
        }
      });

    if (this.userTypeStatus.JobTypeUid == "D") {
      this.isVisibleSubspeciality = true;
    } else {
      this.isVisibleSubspeciality = false;
    }

    rowData.SubSpecialityId.forEach((x) => {
      var singleSubSpecialty = this.SubSpecialtyList.find(
        (p) => p.SubspecialtyId == x
      );

      if (singleSubSpecialty != null) {
        this.selectedSubSpecialty.push(singleSubSpecialty);
      }
    });

    if (rowData.CountryId != null) {
      this.selectedCountry = this.countryList.find(
        (e) => e.CountryId == rowData.CountryId
      );

      if (this.selectedCountry != null) {
        this.userService
          .getProvinceList(this.selectedCountry.CountryId)
          .subscribe((res: GblProvince[]) => {
            this.ProvinceList = res;
            if (this.ProvinceList.length > 0) {
              this.selectedProvince = this.ProvinceList.find(
                (x) => x.ProvinceId == rowData.ProvinceId
              );
            }
            if (this.selectedProvince != null) {
              this.userService
                .getDistrictList(this.selectedProvince.ProvinceId)
                .subscribe((x) => {
                  if (x) {
                    this.districtList = x;
                    if (this.districtList.length > 0) {
                      this.selectedDistrict = this.districtList.find(
                        (x) => x.DistrictId == rowData.DistrictId
                      );
                    }
                    if (this.selectedDistrict != null) {
                      this.userService
                        .getSubDistrictList(this.selectedDistrict.DistrictId)
                        .subscribe((x) => {
                          if (x) {
                            this.SubDistrictList = x;
                            if (this.SubDistrictList.length > 0) {
                              this.selectedSubDistrict =
                                this.SubDistrictList.find(
                                  (x) =>
                                    x.SubdistrictId == rowData.SubdistrictId
                                );
                            }
                          }
                        })
                        .add(() => {
                          this.userService
                            .getPostalCodesByDistricId(
                              this.selectedDistrict.DistrictId
                            )
                            .subscribe(
                              (res: GeneralResModel<GblPostalCode[]>) => {
                                if (res.IsSucceed) {
                                  this.postalCodeList = res.Result;

                                  if (this.postalCodeList.length > 0) {
                                    this.selectedZipCode =
                                      this.postalCodeList.find(
                                        (x) => x.PostalCode == rowData.ZipCode
                                      );
                                  }
                                }
                              }
                            );
                        });
                    }
                  }
                });
            }
          });
      }
    }

    this.selectedOrgType = this.orgTypeList.find(
      (x) => x.value == rowData.OrgType
    );
    this.selectedOrganizationForUpdateUser = this.tempOrgList.find(
      (x) => x.OrgId == rowData.OrgId
    );
    this.userInfoConfirm = true;
  }

  closeUpdateModal() {
    this.loadOrganization();
    this.userInfoConfirm = false;
    this.selectedCountry = null;
    this.ProvinceList = [];
    this.selectedProvince = null;
    this.selectedDistrict = null;
    this.selectedSubDistrict = null;
    this.selectedZipCode = null;
    this.selectedSubSpecialty = [];
    this.orgTypeList = [];
    this.selectedOrganization = null;
  }

  updateUser(user: User) {
    try {
      user.Status = this.userStatus.value;
      user.JobType = this.userTypeStatus.JobTypeUid;
      user.JobTypeId = this.userTypeStatus.JobTypeId;
      if (this.selectedUserLevel?.JobTypeLevelId) {
        user.JobTypeLevelId = this.selectedUserLevel.JobTypeLevelId;
      }

      if (this.selectedCountry?.CountryId > 0) {
        user.CountryId = this.selectedCountry.CountryId;
        user.ProvinceId = this.selectedProvince?.ProvinceId;
        user.DistrictId = this.selectedDistrict?.DistrictId;
        user.SubdistrictId = this.selectedSubDistrict?.SubdistrictId;
        user.PostalCodeId = this.selectedZipCode?.PostalCodeId;
      }
      if (this.selectedUser?.ZipCode != null) {
        user.ZipCode = this.selectedUser.ZipCode;
      }
      user.HrEmpsubspecialty = this.selectedSubSpecialty;

      user.LineId = this.selectedUser.LineId;
      user.MedicalLincence = this.selectedUser.MedicalLincence;
      user.Pwd = this.selectedUser.Password;

      this.userService
        .updateUser(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if (data) {
            this.alertify.success("User updated successfully");
            this.getUserListByOrgId(data.OrgId);
            this.userInfoConfirm = false;
          }
        });
    } catch (error) {
      throw error;
    }
  }

  approveUser(user: User) {
    try {
      this.userService
        .approveUser(user.EmpId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          if (data) {
            this.alertify.success("User approved successfully");
            user.Status = "A";
            this.userInfoConfirm = false;
          }
        });
    } catch (error) {
      throw error;
    }
  }

  checkEmail(event) {
    try {
      this.searchTextSubject$.next(this.userEnty.EmailOfficial);
      this.searchTextSubject$
        .pipe(
          debounceTime(500),
          switchMap((searchText) => this.userService.isExistEmail(searchText))
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((status) => {
          this.emailExists = !status;
        });
    } catch (error) {
      throw error;
    }
  }

  addUserFormControl() {
    this.newUserForm = this.formBuilder.group(
      {
        firstName: ["", [Validators.required, nameValidator, trimValidator]],
        lastName: ["", [Validators.required, nameValidator, trimValidator]],
        phoneNo: [
          "",
          [Validators.required, phoneNumberValidator, trimValidator],
        ],
        // email: ["", [Validators.required, emailValidator, trimValidator]],
        email: ["", [Validators.required, emailPatternValidator, trimValidator]],
        newPassword: ["", [Validators.required, trimValidator]],
        confirmPassword: ["", [Validators.required]],
        userRole: ["", [Validators.required]],
        //userLevel: ["",{disabled:false}, [Validators.required]],
        userLevel: ["", [Validators.required]],
        lineId: [""],
        country: ["", [Validators.required]],
        province: [""],
        district: [""],
        subDistrict: [""],
        SubdistrictId: [""],
        subSpecialty: [""],
        zipCode: [""],
        medicalLincence: [""],
        OrgType: ["", [Validators.required]],
        Organization: ["", [Validators.required]],

        // country : [this.selectedCountry,[Validators.required]],
      },
      { validator: this.passwordMatch }
    );
  }

  passwordMatch(g: FormGroup) {
    try {
      return g.get("newPassword").value === g.get("confirmPassword").value
        ? null
        : { mismatch: true };
    } catch (error) {
      throw error;
    }
  }

  get addFormControl() {
    return this.newUserForm.controls;
  }

  closeAddUserModal() {
    this.isOnLoad = true;
    this.loadOrganization();
  }

  loadSelectedOrgTypeOrganizationForApproveAndUpdate() {
    this.userService.getAllOrgListByOrgId(this.client.OrgId).subscribe((x) => {
      if (x.IsSucceed) {
        this.tempOrgList = x.Result as Gblenv[];
        console.log("this.selectedOrgType", this.selectedOrgType);

        this.orgList = this.tempOrgList.filter(
          (x) => x.OrgType == this.selectedOrgType.value
        );
      }
    });

    if (this.selectedOrgType != null && this.orgList.length > 0) {
      //this.isVisibleUpdateUserButton = true;
    }
  }

  onChangeOrganizationForApproveAndUpdate() {
    if (this.selectedOrganizationForUpdateUser.OrgId > 0) {
      //this.isVisibleUpdateUserButton = true;
    }
  }

  onClearOrganization() {
    //this.isVisibleUpdateUserButton = false;
  }

  loadSelectedOrgTypeOrganization() {
    this.userService.getAllOrgListByOrgId(this.client.OrgId).subscribe((x) => {
      if (x.IsSucceed) {
        console.log("***ORGTYPE", this.newUserForm.get("OrgType").value);

        this.tempOrgList = x.Result as Gblenv[];
        this.orgList = this.tempOrgList.filter(
          (x) => x.OrgType == this.newUserForm.get("OrgType").value
        );
      }
    });
  }

  loadOrganization() {
    this.userService.getAllOrgListByOrgId(this.client.OrgId).subscribe((x) => {
      if (x.IsSucceed) {
        this.tempOrgList = x.Result as Gblenv[];
        this.orgList = this.tempOrgList.filter(
          (x) => x.OrgType == this.client.OrgType
        );
      }
    });
  }

  addNewUser() {
    try {
      this.newUserForm.reset();
      this.loadOrgTypeList();
      this.setPatchValueForNewUserForm();
      this.isVisibleSubspeciality = false;
      this.isVisibleUserLevel = false;

      this.displayAddUserPopUp = true;
      this.emailExists = true;
      this.addUserPopUpHeader = "User Information Entry";
      this.saveText = "Save";
      this.initializeUserForm();
    } catch (error) {
      throw error;
    }
  }

  initializeUserForm() {
    try {
      this.newUserForm.controls["firstName"].setValue("");
      this.newUserForm.controls["lastName"].setValue("");
      this.newUserForm.controls["phoneNo"].setValue("");
      this.newUserForm.controls["email"].setValue("");
      this.newUserForm.controls["newPassword"].setValue("");
      this.newUserForm.controls["confirmPassword"].setValue("");
    } catch (error) {
      throw error;
    }
  }

  createUser() {
    try {
      this.saveUser("P");
    } catch (error) {
      throw error;
    }
  }

  createAndApprove() {
    try {
      this.saveUser("A");
    } catch (error) {
      throw error;
    }
  }

  saveUser(approvalSts) {
    try {
      let userForm = new FormData();
      userForm.append("Fname", this.newUserForm.get("firstName").value);
      userForm.append("Lname", this.newUserForm.get("lastName").value);
      userForm.append("EmailOfficial", this.newUserForm.get("email").value);
      userForm.append("Pwd", this.newUserForm.get("newPassword").value);
      userForm.append("PhoneMobile", this.newUserForm.get("phoneNo").value);
      userForm.append(
        "JobType",
        this.newUserForm.get("userRole").value.JobTypeUid + ""
      );
      userForm.append("Status", approvalSts);
      userForm.append(
        "JobTypeId",
        this.newUserForm.get("userRole").value.JobTypeId
      );
      if (this.newUserForm.get("userLevel").value?.JobTypeLevelId) {
        userForm.append(
          "JobTypeLevelId",
          this.newUserForm.get("userLevel").value.JobTypeLevelId
        );
      }

      // if (this.newUserForm.get("zipCode")?.value) {
      //   userForm.append("ZipCode", this.newUserForm.get("zipCode")?.value);
      // }

      let tempVal = this.newUserForm.get("zipCode")?.value;

      console.log("tempVal: ", tempVal);

      if (tempVal) {
        this.selectedZipCode = this.postalCodeList.find(
          (x) => x.PostalCodeId === tempVal
        );

        userForm.append("ZipCode", this.selectedZipCode.PostalCode);
        userForm.append("PostalCodeId", this.selectedZipCode.PostalCodeId + "");
      }

      if (this.newUserForm.get("LineId")?.value) {
        userForm.append("LineId", this.newUserForm.get("lineId")?.value);
      }

      if (this.newUserForm.get("country").value.CountryId) {
        userForm.append(
          "CountryId",
          this.newUserForm.get("country").value.CountryId + ""
        );
      }

      if (this.newUserForm.get("province").value?.ProvinceId) {
        userForm.append(
          "ProvinceId",
          this.newUserForm.get("province").value.ProvinceId + ""
        );
      }
      if (this.newUserForm.get("district").value?.DistrictId) {
        userForm.append(
          "DistrictId",
          this.newUserForm.get("district").value.DistrictId + ""
        );
      }

      let tempSubDistrict =
        this.newUserForm.get("subDistrict").value?.SubdistrictId;

      if (tempSubDistrict > 0) {
        userForm.append("SubdistrictId", tempSubDistrict + "");
      }

      if (this.newUserForm.get("subSpecialty").value?.length) {
        for (
          let i = 0;
          i < this.newUserForm.get("subSpecialty").value?.length;
          i++
        ) {
          userForm.append(
            "HrEmpsubspecialtyId",
            this.newUserForm
              .get("subSpecialty")
              .value[i].SubspecialtyId.toString()
          );
        }
      }

      if (this.newUserForm.get("Organization").value) {
        userForm.append("OrgId", this.newUserForm.get("Organization").value);
      }

      if (this.newUserForm.get("medicalLincence")?.value) {
        userForm.append(
          "MedicalLincence",
          this.newUserForm.get("medicalLincence")?.value
        );
      }

      if (this.newUser.hrEmpdocuments.length) {
        for (let i = 0; i < this.newUser.hrEmpdocuments.length; i++) {
          userForm.append(
            "hrEmpdocuments",
            this.newUser.hrEmpdocuments[i].File
          );

          userForm.append(
            "hrEmpdocumentFileTitle",
            this.newUser.hrEmpdocuments[i].Title
          );
          userForm.append(
            "hrEmpdocumentFileFormat",
            this.newUser.hrEmpdocuments[i].Format
          );
          userForm.append(
            "hrEmpdocumentFileType",
            this.newUser.hrEmpdocuments[i].Type
          );
        }
      }

      this.userService
        .addNewUser(userForm)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            console.log("this.destroy", this.destroy$);

            console.log("data", data);
            if (data) {
              this.afterSave(data, approvalSts);
            }
          },
          (error) => {
            this.alertify.error("User Creation Failed");
          }
        );
    } catch (error) {
      throw error;
    }
  }

  //load list of data on dropdown
  private loadSubspecialist() {
    this.userService.getSubSpecialtyList().subscribe((x) => {
      if (x) {
        this.SubSpecialtyList = x;
      }
    });
  }

  private getCountryList() {
    this.userService.getCountryList().subscribe((res: GblCountry[]) => {
      this.countryList = res;
    });
  }

  loadProvinceForNewuser() {
    this.userService
      .getProvinceList(this.newUserForm.get("country").value.CountryId)
      .subscribe((res: GblProvince[]) => {
        this.ProvinceList = res;
      });
  }

  loadDistrictForNewuser() {
    this.userService
      .getDistrictList(this.newUserForm.get("province").value.ProvinceId)
      .subscribe((x) => {
        if (x) {
          this.districtList = x;
        }
      });
  }

  loadSubDistrictForNewuser() {
    this.userService
      .getSubDistrictList(this.newUserForm.get("district").value.DistrictId)
      .subscribe((x) => {
        if (x) {
          this.SubDistrictList = x;
        }
      })
      .add(() => {
        this.loadPostalCodesByDistricId(
          this.newUserForm.get("district").value.DistrictId
        );
      });
  }

  onClearCountry() {
    this.ProvinceList = null;
    this.districtList = null;
    this.SubDistrictList = null;
    this.postalCodeList = null;
  }

  onClearProvince() {
    this.districtList = null;
  }

  onClearDistrict() {
    this.SubDistrictList = null;
    this.postalCodeList = null;
  }

  loadProvince() {
    this.userService
      .getProvinceList(this.selectedCountry.CountryId)
      .subscribe((res: GblProvince[]) => {
        this.ProvinceList = res;
      });
  }

  loadDistrict() {
    this.userService
      .getDistrictList(this.selectedProvince.ProvinceId)
      .subscribe((x) => {
        if (x) {
          this.districtList = x;
        }
      });
  }

  loadSubDistrict() {
    this.userService
      .getSubDistrictList(this.selectedDistrict.DistrictId)
      .subscribe((x) => {
        if (x) {
          this.SubDistrictList = x;
        }
      });
  }

  afterSave(data, approvalSts) {
    try {
      approvalSts == "P"
        ? this.alertify.success("User Created Successfully")
        : this.alertify.success("User Created and Approved Successfully");
      this.displayAddUserPopUp = false;
      data.FullName = data.Fname + " " + data.Lname;
      this.getUserListByOrgId(this.client.OrgId);
    } catch (error) {
      throw error;
    }
  }

  documentUploader(event): void {
    this.userDocumet = new HrEmpdocument();
    this.documentFile = event.target.files[0];
    if (this.documentFile) {
      let fileName = this.documentFile.name;
      this.userDocumet.Title = fileName.split(".").slice(0, -1).join(".");

      this.userDocumet.Format = fileName.split(".").pop();
      this.userDocumet.File = this.documentFile;

      this.userDocumet.GUID = this.makeid(7);
    } else {
      this.alertify.warning("Please select a file first");
    }
  }

  uploadDocuments() {
    if (this.userDocumet?.File) {
      this.userDocumet.Type = this.selectedDocumentType.code;

      this.newUser.hrEmpdocuments.push(this.userDocumet);

      this.userDocumet = new HrEmpdocument();
      this.selecetdInput = null;
    }
  }

  deleteOrderDocument(document: HrEmpdocument) {
    console.log(document);
    this.newUser.hrEmpdocuments = this.newUser.hrEmpdocuments.filter(
      (x) => x.GUID != document.GUID
    );
  }

  private makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  ngAfterContentChecked() {
    this._cdref.detectChanges();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}  
  ngOnDestroy(): void {
    try {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    } catch (error) {
      throw error;
    }
  }



}