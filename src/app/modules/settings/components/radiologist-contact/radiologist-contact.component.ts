import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models';
import { GblCountry } from 'src/app/core/models/settings/radiologist-signup/GblCountry';
import { GblProvince } from 'src/app/core/models/settings/radiologist-signup/GblProvince';
import { HrSubspecialty } from 'src/app/core/models/settings/radiologist-signup/HrSubspecialty';
import { SiteInformation } from 'src/app/core/models/settings/site-information';
import { UserListViewModel } from 'src/app/core/models/settings/UserListViewModel';
import { GeneralResModel } from 'src/app/core/models/shared/general-res.model';
import { HrEmpOrgMappingModel } from 'src/app/core/models/user-models/hr-emp-org-mapping.model';
import { LocalStorageService } from 'src/app/core/services';
import { AlertifyService } from 'src/app/core/services/common/toast/alertify.service';
import { SiteService } from 'src/app/core/services/settings/site.service';
import { UserService } from 'src/app/core/services/settings/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-radiologist-contact',
  templateUrl: './radiologist-contact.component.html',
  styleUrls: ['./radiologist-contact.component.scss']
})
export class RadiologistContactComponent implements OnInit{
  activityValues: number[] = [0, 100];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild("dt", { static: true }) dt!: Table;
  radiologistList: UserListViewModel[] = [];
  radiologistMappingData: UserListViewModel[] = [];
  client: User = new User();
  isVisibleAddMappingDialog!: boolean;
  radiologistMappingForm!: FormGroup;
  hrEmpOrgMappingModel: HrEmpOrgMappingModel = new HrEmpOrgMappingModel();
  selectedRadId!: number;
  userValueSendForChild!: UserListViewModel;
  selectedRowData!: UserListViewModel;
  prorileUrl!: string;
  singleSubSpecialty?: HrSubspecialty;
  selectedSubSpecialty: HrSubspecialty[] = [];
  selectedCountry?: GblCountry;
  deactivateRadiologistMappingReq!: UserListViewModel;
  selectedProvince?: GblProvince;
  profileImagerUrl = environment.profileImagerUrl;
  tabIndex = 0;
  activeTab = 0;

  siteList?: SiteInformation[] = [];
  countryList: GblCountry[] = [];
  subSpecialtyList: HrSubspecialty[] = [];

  isRadiologistMappingEditActionOn: boolean = false;
  isVisibleDeactivateMappingDialog: boolean = false;
  isVisibleApprovalMappingDialog: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _siteService: SiteService,
    private _userService: UserService,
    private _alertifyService:AlertifyService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.client = LocalStorageService.getUserStorageValue();
    this.loadRadiologist();
    this.getFilterHospitalList("Imaging");
    this.addRdiologistMappingFormInit();
    this.getCountryList();
    this.getSubSpecialtyList();

    this._userService.currenthospitalContract.subscribe((x) => {
      if (x) {
        this.addRadiologistMapping();
        this.loadRadiologist();
      }
    });
    
  }

  loadRadiologist() {

      if (this.client.EmpId > 0) {
        if (this.client.JobType === "D") {
          this.getUserMappingByOrgId(this.client.OrgId, this.client.EmpId);
        } else {
          this.getUserMappingByOrgId(this.client.OrgId);
        }
        this.getRadiologistByOrgId(this.client.AppCustomerID);
      }

  }
  
  private getRadiologistByOrgId(orgId: number) {
    this._userService
      .getRadiologistByOrgId(orgId)
      .subscribe((res: UserListViewModel[]) => {
        if (res.length > 0) {
          this.radiologistList = res;
        }
      })
      .add(() => {
        if (this.client.JobType === "D") {
          this.selectedRadId = this.client.EmpId;
          this.radiologistMappingForm.patchValue({
            EmpId: this.client.EmpId,
          });
        }
      });
  }
  private getUserMappingByOrgId(orgId: number, empId?: number) {
    this.loading = true;
    this._userService
      .getUserMappingByOrgId(orgId, empId)
      .subscribe((res: UserListViewModel[]) => {
        if (res.length > 0) {
          this.radiologistMappingData = res;
        }
        this.loading = false;
      });
  }

  addRadiologistMapping() {
    this.isVisibleAddMappingDialog = true;
    this.loadRadiologist();
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
  private getCountryList() {
    this._userService.getCountryList().subscribe((res: GblCountry[]) => {
      if (res.length > 0) {
        this.countryList = res;
      }
    });
  }
  private getSubSpecialtyList() {
    this._userService
      .getSubSpecialtyList()
      .subscribe((res: HrSubspecialty[]) => {
        if (res.length > 0) {
          this.subSpecialtyList = res;
        }
      });
  }
  closeaddRadiologistMappingDialog() {
    this.addRdiologistMappingFormInit();
    this.isVisibleAddMappingDialog = false;
  }
  onSubmit() {
    this.hrEmpOrgMappingModel = this.radiologistMappingForm
      .value as HrEmpOrgMappingModel;
    this.hrEmpOrgMappingModel.UserId = this.client.EmpId;
    this._userService.addEmpMapping(this.hrEmpOrgMappingModel).subscribe(
      (data) => {
        if (data.IsSucceed) {
         
          this._alertifyService.success(data.Message);

          this.isVisibleAddMappingDialog = false;
          this._userService.changehospitalContract(false);
          if (this.client.JobType === "D") {
            this.getUserMappingByOrgId(this.client.OrgId, this.client.EmpId);
          } else {
            this.getUserMappingByOrgId(this.client.OrgId);
          }
        } else {
         
          this._alertifyService.error(data.Message);
        }
      },
      (error) => {
        // this._alertify.error(error.Message);
      }
    );
  }
  private addRdiologistMappingFormInit() {
    this.radiologistMappingForm = this._fb.group({
      EmpId: [0, Validators.required],
      OrgIds: [[], Validators.required],
      IsActive: [false],
      IsDefault: [false],
    });
  }
  deactivateRadMappingInfo(rowData: UserListViewModel) {
    this.userValueSendForChild = rowData;
    this.getBasicInfoForShow(rowData);
    this.deactivateRadiologistMappingReq.EmporgSetupId = rowData.EmporgSetupId;
    this.isVisibleDeactivateMappingDialog = true;
    this.activeTab = 0;
  }
  private getBasicInfoForShow(rowData: UserListViewModel) {
    this.selectedRowData = rowData;

    console.log("this.selectedRowData: ", this.selectedRowData);

    if (this.selectedRowData != null) {
      if (
        this.selectedRowData.ImgFileName !== null &&
        this.selectedRowData.ImgFileName !== "" &&
        this.selectedRowData.ImgFileName !== "undefined"
      ) {
        this.prorileUrl =
          this.profileImagerUrl +
          this.selectedRowData.EmpId +
          "/" +
          this.selectedRowData.ImgFileName;
      } else {
        this.prorileUrl = "assets/layout/images/default-img/no_image.png";
      }
    }

    rowData.SubSpecialityId.forEach((x) => {
      this.singleSubSpecialty = this.subSpecialtyList.find(
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
    }
  }
  onApproveRadiologistMapping() {
    this.selectedRowData.LastModifiedBy = this.client.EmpId;
    this.selectedRowData.IsEmpMappingActive = true;
    this._userService
      .approveEmpMappOrg(this.selectedRowData)
      .subscribe((data) => {
        if (data.IsSucceed) {
          this._alertifyService.success(data.Message);
          this.isVisibleApprovalMappingDialog = false;
          if (this.client.JobType === "D") {
            this.getUserMappingByOrgId(this.client.OrgId, this.client.EmpId);
          } else {
            this.getUserMappingByOrgId(this.client.OrgId);
          }
        } else {
          this._alertifyService.error(data.Message);
         
        }
      });
  }
  closeRadiologistApprovalMappingDialog() {
    this.tabIndex = 0;
    this.isVisibleApprovalMappingDialog = false;
  }
  closeRadiologistDeactivateMappingDialog() {
    this.tabIndex = 0;
    this.deactivateRadiologistMappingReq = new UserListViewModel();
    this.isVisibleDeactivateMappingDialog = false;
  }
  onSubmitForDeactivateRadiologist() {
    this._confirmationService.confirm({
      key: "deactivateRadiologistContactConfirm",
      message: "Are you sure you want to deactivate this Radiologist?",
      accept: () => {
        this.deactivateRadiologistMappingReq.InactivatedBy = this.client.EmpId;
        this.deactivateRadiologistMappingReq.IsEmpMappingActive = false;
        this._userService
          .deactivateRadiologistContact(this.deactivateRadiologistMappingReq)
          .subscribe((res: GeneralResModel<UserListViewModel>) => {
            if (res.IsSucceed) {
               this._alertifyService.success(res.Message);
              if (this.client.JobType === "D") {
                this.getUserMappingByOrgId(
                  this.client.OrgId,
                  this.client.EmpId
                );
              } else {
                this.getUserMappingByOrgId(this.client.OrgId);
              }
              this.deactivateRadiologistMappingReq = new UserListViewModel();
              this.isVisibleDeactivateMappingDialog = false;
            } else {
              this._alertifyService.error(res.Message);
             
            }
          });
      },
      reject: () => {
        this._alertifyService.error("You've rejected to deactivate this Radiologist." );
      },
    });
  }
  switchHeaders(tabNumber: any) {
    this.activeTab = tabNumber.index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
}
