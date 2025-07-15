import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models';
import { GblEnvViewModel } from 'src/app/core/models/settings/orginfos/gbl-env-view.model';
import { GblCountry } from 'src/app/core/models/settings/radiologist-signup/GblCountry';
import { GblDistrict } from 'src/app/core/models/settings/radiologist-signup/GblDistrict';
import { GblProvince } from 'src/app/core/models/settings/radiologist-signup/GblProvince';
import { GblSubdistrict } from 'src/app/core/models/settings/radiologist-signup/GblSubdistrict';
import { SiteInformation } from 'src/app/core/models/settings/site-information';
import { GeneralResModel } from 'src/app/core/models/shared/general-res.model';
import { MessageConstant } from 'src/app/core/models/shared/message.constant';
import { LocalStorageService } from 'src/app/core/services';
import { AlertifyService } from 'src/app/core/services/common/toast/alertify.service';
import { OrgService } from 'src/app/core/services/settings/org.service';
import { SiteService } from 'src/app/core/services/settings/site.service';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-hospital-contact',
  templateUrl: './hospital-contact.component.html',
  styleUrls: ['./hospital-contact.component.scss']
})
export class HospitalContactComponent implements OnInit{

  client: User = new User();
  hospitalContactData: GblEnvViewModel[] = [];
  hospitalMapToList?: SiteInformation[] = [];
  hospitalReferList?: SiteInformation[] = [];
  hospitalMappingForm!: FormGroup;
  envMappingModel!: GblEnvViewModel;
  selectedRowData!: GblEnvViewModel;
  deactivateHospitalContactReq: GblEnvViewModel = new GblEnvViewModel();

  isVisibleAddMappingDialog!: boolean;
  isHospitalMappingEditActionOn!: boolean;
  isvisibleDialogForApproval: boolean = false;
  isvisibleDialogForDeactivate: boolean = false;

  countryList: GblCountry[] = [];
  selectedCountry?: GblCountry;
  provinceList: GblProvince[] = [];
  selectedProvince?: GblProvince;
  selectedDistrict?: GblDistrict;
  districtList: GblDistrict[] = [];
  subDistrictList: GblSubdistrict[] = [];
  selectedSubDistrict?: GblSubdistrict;

  activityValues: number[] = [0, 100];

  loading: boolean = true;
  defaultLogo = "assets/app_images/default-img/no_image.png";
  @ViewChild('filter') filter!: ElementRef;

  constructor(private _siteService: SiteService,
    private _orgInfoService: OrgService,
    private _userService: UserService,
    private _confirmationService: ConfirmationService,
    private _alertifyService:AlertifyService,
    private _fb: FormBuilder){

  }

  ngOnInit(): void {
    this.client = LocalStorageService.getUserStorageValue();
    this.basicInitialization();
    this.getFilterHospitalList("Imaging");
    this.getFilterHospitalList("Referring");
  }
  private basicInitialization() {
    if (this.client.OrgId > 0) {
      if (this.client.IsReferring) {
        this.getOrgInfoMappingListByOrgId(this.client.OrgId, "Referring");
      } else {
        this.getOrgInfoMappingListByOrgId(this.client.OrgId, "Imaging");
      }
    }

    this.getCountryList();
    this.getProvinces();
    this.getDistricts();
    this.getSubdistricts();
    this.addRdiologistMappingFormInit();
    this.isReferingHospital();

  }
  getFilterHospitalList(type: string) {
    this._siteService
      .getFilterHospitalList(type)
      .subscribe((res: GeneralResModel<SiteInformation[]>) => {
        if (res.IsSucceed) {
          if (type == "Imaging") {
            this.hospitalMapToList = res.Result;
          } else if (type == "Referring") {
            this.hospitalReferList = res.Result;
          }
        }
      });
  }
  private addRdiologistMappingFormInit() {
    this.hospitalMappingForm = this._fb.group({
      OrgId: ["", Validators.required],
      OrgIdMapTo: ["", Validators.required],
      IsActive: [false],
      IsDefault: [false],
    });
  }
  onSubmit() {
    this.envMappingModel = this.hospitalMappingForm.value as GblEnvViewModel;
    this.envMappingModel.CreatedBy = this.client.EmpId;
    // console.log(this.envMappingModel);
    this._orgInfoService.addGblmappingEnv(this.envMappingModel).subscribe(
      (res) => {
        if (res.IsSucceed) {
    
          this._alertifyService.success(MessageConstant.Success)
          this.isVisibleAddMappingDialog = false;
          this.addRdiologistMappingFormInit();
          this.basicInitialization();
        }
      },
      (reserro) => {
        console.log(reserro);
        this._alertifyService.error(reserro.error.Message)
      }
    );
  }
  private getOrgInfoMappingListByOrgId(orgId: number, type: string) {
    this.loading = true;
    this._orgInfoService
      .getOrgInfoMappingListByOrgId(orgId, type)
      .subscribe((res: GeneralResModel<GblEnvViewModel[]>) => {
        if (res.IsSucceed) {
          this.hospitalContactData = res.Result as GblEnvViewModel[];
        }
        this.loading = false;
      });
  }
  openForEditHospitalContactDialog(rowData: GblEnvViewModel) {
    this.isvisibleDialogForDeactivate = true;
  }
  openForDeactivateHospitalContact(rowData: GblEnvViewModel) {
    this.getBasicInfoForShow(rowData);
    this.deactivateHospitalContactReq = rowData;
    this.isvisibleDialogForDeactivate = true;
  }
  openAddHospitalContact() {
    this.isVisibleAddMappingDialog = true;
  }
  private getCountryList() {
    this._userService.getCountryList().subscribe((res: GblCountry[]) => {
      if (res.length > 0) {
        this.countryList = res;
      }
    });
  }
  private getProvinces() {
    this._userService.getProvinces().subscribe((res: GblProvince[]) => {
      if (res.length > 0) {
        this.provinceList = res;
      }
    });
  }
  private getDistricts() {
    this._userService.getDistricts().subscribe((res: GblDistrict[]) => {
      if (res.length > 0) {
        this.districtList = res;
      }
    });
  }
  private getSubdistricts() {
    this._userService.getSubdistricts().subscribe((res: GblSubdistrict[]) => {
      if (res.length > 0) {
        this.subDistrictList = res;
      }
    });
  }

  isReferingHospital() {
    if (this.client.IsReferring) {
      this.hospitalMappingForm.patchValue({
        OrgId: this.client.OrgId,
      });
    }
  }

closeaddRadiologistMappingDialog(): void {
  this.isVisibleAddMappingDialog = false;
  this.addRdiologistMappingFormInit();
  this.isReferingHospital();
}
closeHospitalContactApprovalDialog() {
  this.selectedRowData = new GblEnvViewModel();
  this.isvisibleDialogForApproval = false;
}

onApproveHospitalContact() {
  this.selectedRowData.LastModifiedBy = this.client.EmpId;
  this.selectedRowData.IsMappingActive = true;
  this._orgInfoService
    .approvedMappingOrgInfo(this.selectedRowData)
    .subscribe((data) => {
      if (data.IsSucceed) {
        this._alertifyService.success(data.Message);
        this.isvisibleDialogForApproval = false;
        this.getOrgInfoMappingListByOrgId(this.client.OrgId, "Imaging");
      } else {
        this._alertifyService.error(data.Message);
      }
    });
}
  closeDeactivateHospitalContactDialog() {
    this.selectedRowData = new GblEnvViewModel();
    this.isvisibleDialogForDeactivate = false;
  }
  onSubmitForDeactivateHospitalContact() {
    this._confirmationService.confirm({
      key: "deactivateHospitalContactConfirm",
      message: "Are you sure you want to deactivate this Hospital?",
      accept: () => {
        this.deactivateHospitalContactReq.LastModifiedBy = this.client.EmpId;
        this.deactivateHospitalContactReq.IsMappingActive = false;
        this._orgInfoService
          .deactivateHospitalContact(this.deactivateHospitalContactReq)
          .subscribe((res: GeneralResModel<GblEnvViewModel>) => {
            if (res.IsSucceed) {
      
              this._alertifyService.success(res.Message);
              // this.getOrgInfoMappingListByOrgId(this.client.OrgId, "Imaging");
              this.basicInitialization();
              this.deactivateHospitalContactReq = new GblEnvViewModel();
              this.isvisibleDialogForDeactivate = false;
            } else {

              this._alertifyService.error(res.Message );
            }
          });
      },
      reject: () => {
       
        this._alertifyService.success("You've rejected to deactivate this Radiologist.");
      },
    });
  }
  onSubmitForUpdateHospitalContact() {
    this.deactivateHospitalContactReq.LastModifiedBy = this.client.EmpId;
        this._orgInfoService
          .updateHospitalContact(this.deactivateHospitalContactReq)
          .subscribe((res: GeneralResModel<GblEnvViewModel>) => {
            if (res.IsSucceed) {
      
              this._alertifyService.success(res.Message);
              this.basicInitialization();
              this.deactivateHospitalContactReq = new GblEnvViewModel();
              this.isvisibleDialogForDeactivate = false;
            } else {

              this._alertifyService.error(res.Message );
            }
          });
  }
  openForHospitalContactApprovalDialog(rowData: GblEnvViewModel) {
    this.getBasicInfoForShow(rowData);
    this.isvisibleDialogForApproval = true;
  }
  private getBasicInfoForShow(rowData: GblEnvViewModel) {
    this.selectedRowData = rowData;

    if (rowData.CountryId != null) {
      this.selectedCountry = this.countryList.find(
        (c) => c.CountryId == rowData.CountryId
      );
    }

    if (rowData.ProvinceId != null) {
      this.selectedProvince = this.provinceList.find(
        (p) => p.ProvinceId == rowData.ProvinceId
      );
    }

    if (rowData.DistrictId != null) {
      this.selectedDistrict = this.districtList.find(
        (d) => d.DistrictId == rowData.DistrictId
      );
    }

    if (rowData.SubdistrictId != null) {
      this.selectedSubDistrict = this.subDistrictList.find(
        (sd) => sd.SubdistrictId == rowData.SubdistrictId
      );
    }
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
}
