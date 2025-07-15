import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { GeneralResModel } from 'src/app/core/models';
import { Configuration } from 'src/app/core/models/configurations/configuration.model';
import { Gblenv } from 'src/app/core/models/settings/orginfos/gblenv.model';
import { Gblpackage } from 'src/app/core/models/settings/orginfos/gblpackage.model';
import { GblCountry } from 'src/app/core/models/settings/radiologist-signup/GblCountry';
import { GblDistrict } from 'src/app/core/models/settings/radiologist-signup/GblDistrict';
import { GblPostalCode } from 'src/app/core/models/settings/radiologist-signup/GblPostalCode';
import { GblProvince } from 'src/app/core/models/settings/radiologist-signup/GblProvince';
import { GblSubdistrict } from 'src/app/core/models/settings/radiologist-signup/GblSubdistrict';
import { HrEmpVerify } from 'src/app/core/models/settings/radiologist-signup/HrEmpVerify';
import { SiteInformation } from 'src/app/core/models/settings/site-information';
import { AlertifyService, OrgService, SiteService } from 'src/app/core/services';
import { ConfigurationService } from 'src/app/core/services/configurations/configuration.service';
import { UserVerifyService } from 'src/app/core/services/settings/user-verify.service';
import { UserService } from 'src/app/core/services/settings/user.service';
import { emailValidator } from 'src/app/core/validators';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup-hospital',
  templateUrl: './signup-hospital.component.html',
  styleUrls: ['./signup-hospital.component.scss']
})
export class SignupHospitalComponent implements OnInit {
  showSpinner: boolean = false;
  orgForm: FormGroup;
  showOrHideResendButton: boolean;
  isLoaderVisible: boolean;
  VerificationId: any;
  selectedEmailOTP: any;
  HospitalLogoToUpload: any;
  ProfileImageToUpload: any;
  packageList: Gblpackage[] = [];
  @ViewChild("ngOtpInputEmail") ngOtpInputRefEmail: any;
  profileImageUrl: string;

  IsSentVerificationCode: boolean = false;
  IsVerifySuccessfull: boolean = false;
  selectedEmail: string;
  emailExists: boolean = false;
  searchEmailTextSubject$ = new Subject<{ email: string; Id: number }>();

  IsEmailVerified: boolean;

  selectedHospitalName: string;
  selectedWebUrl: string;
  selectedTelNo: string;
  selectedLineId: string;

  selectedCountry: GblCountry;
  countryList: GblCountry[];
  selectedDistrict: GblDistrict;
  districtList: GblDistrict[];
  selectedProvince: GblProvince;
  ProvinceList: GblProvince[];
  selectedSubDistrict: GblSubdistrict;
  SubDistrictList: GblSubdistrict[];
  postalCodeList: GblPostalCode[];
  selectedZipCode: GblPostalCode;

  selectedFName: string;
  selectedLName: string;

  selectedPassword: string;
  selectedConfirmPassword: string;
  selectedSiteAdminTelNo: string;
  selectedTermAndCon: boolean = false;
  selectedSiteAdminLineId: string;
  uploadedFiles: any[] = [];
  uploadedFilesForHospitalLogo: any[] = [];
  IsCountDownTimeOut: boolean;
  timerInterval: any;
  display: any;
  cols: any[] = [];
  @ViewChild("dt", { static: true }) dt: Table;
  selectedPackage: Gblpackage = new Gblpackage();
  isPackageSelect: boolean = false;
  isReferringHospital: boolean = false;
  isVisiblePackage: boolean = true;

  siteList: SiteInformation[] = [];
  selectedSite: SiteInformation[] = [];

  isSendOTPbutton: boolean = true;

   config : Configuration = new Configuration();
   orgInfoForSP : Gblenv = new Gblenv();

  constructor(
   
    public layoutService: LayoutService,
    private siteService: SiteService,
    private configurationService: ConfigurationService,
    private _userService: UserService,
    private alertifyService: AlertifyService,
    private userVerifyService: UserVerifyService,
    private orgService: OrgService
  ) {}

  ngOnInit() {
    
    this.getPackageList();
    this.getFilterHospitalList("Imaging");
    this.IsCountDownTimeOut = false;      
    this.configurationService.getJSONwithAPI().subscribe(res=>{
      this.config = res as Configuration;
    // console.log('getJSONwithAPI',this.config );
  });
// console.log('configurationService',this.config);
    this.orgForm = new FormGroup(
      {
        HospitalName: new FormControl("", Validators.required),
        WebUrl: new FormControl(""),
        HospitalTelNo: new FormControl(""),
        SiteAdminTelNo: new FormControl(""),
        FName: new FormControl("", Validators.required),
        LName: new FormControl("", Validators.required),
        Email: new FormControl("", emailValidator),
        Password: new FormControl("", Validators.required),
        ConfirmPassword: new FormControl("", Validators.required),
        LineId: new FormControl(),
        PhoneNo: new FormControl(
          "",
          Validators.compose([Validators.pattern("[0-9]+")])
        ),
        phoneCode: new FormControl(),
        Country: new FormControl(),
        District: new FormControl(),
        Province: new FormControl(),
        SubDistrict: new FormControl(),
        SubSpecialty: new FormControl(),
        ZipCode: new FormControl(),
        MedicalLincence: new FormControl(),
        TearmAndCondition: new FormControl(false, Validators.required),
        SiteAdminLineId: new FormControl(),
        OrgIdS: new FormControl([]),
      },
      { validators: this.passwordMatch }
    );

    this.profileImageUrl = environment.defaultRadiologistImage;

    this.loadStartUpData();
    
   
  }

  getOrgInfoForSP(){
    this.selectedSite = [];
    this.orgService
    .getGblEnvById(1)
    .subscribe((res) => {
      if (res.IsSucceed) {
        this.orgInfoForSP = res.Result;
        this.bydefaultImagingSeleted();
        console.log(this.orgInfoForSP.IshideOrgtype);
        console.log(this.selectedSite);
      }
    
    });
  }

  bydefaultImagingSeleted(){
    if (this.orgInfoForSP.IshideOrgtype) {
      if (this.orgInfoForSP.SignupOrgtype==='Referring') {
        // this.isReferringHospital = true;
      this.referringHospitalcheckShow(true);
        this.selectedSite.push(this.siteList.find(e => e.OrgId == this.orgInfoForSP.OrgidDefaultimaging));
      }
      if (this.orgInfoForSP.SignupOrgtype==='Imaging') {
        this.referringHospitalcheckShow(false);
      }
     }
  }
  getFilterHospitalList(type: string) {
    this.siteService
      .getFilterHospitalList(type)
      .subscribe((res: GeneralResModel<SiteInformation[]>) => {
        if (res.IsSucceed) {
          this.siteList = res.Result;
          this.getOrgInfoForSP();
        }
      });
  }
  referringHospitalcheckShow(e) {
    const hospitalTypeChecked = e;
    const orgIdSControl = this.orgForm.get("OrgIdS");
    if (!hospitalTypeChecked) {
      this.selectedSite = [];
      this.isVisiblePackage = true;
      this.isReferringHospital = false;
      orgIdSControl.clearValidators();
    } else {
      this.isVisiblePackage = false;
      this.isReferringHospital = true;
      orgIdSControl.setValidators([Validators.required]);
    }

    orgIdSControl.updateValueAndValidity();
  }
  referringHospitalShow(e) {
    const hospitalTypeChecked = e.checked;
    const orgIdSControl = this.orgForm.get("OrgIdS");
    if (!hospitalTypeChecked) {
      this.selectedSite = [];
      this.isVisiblePackage = true;
      this.isReferringHospital = false;
      orgIdSControl.clearValidators();
    } else {
      this.isVisiblePackage = false;
      this.isReferringHospital = true;
      orgIdSControl.setValidators([Validators.required]);
    }

    orgIdSControl.updateValueAndValidity();
  }

  packageSelected(gblpackage: Gblpackage) {
    this.selectedPackage = gblpackage;
    if (this.selectedPackage != null) {
      this.isPackageSelect = true;
    } else {
      this.isPackageSelect = false;
    }
  }

  getPackageList() {
    this._userService.getGblActivePackages().subscribe((data) => {
      if (data.IsSucceed) {
        this.packageList = data.Result as Gblpackage[];
      }
    });
  }

  VerifyOtp() {
    let userVerify = new HrEmpVerify();
    userVerify.VerifyId = this.VerificationId;
    userVerify.EmailOtp = this.selectedEmailOTP;

    this.userVerifyService.verifyOTP(userVerify).subscribe((x) => {
      if (x) {
        if (x.IsEmailVerified) {
          this.IsEmailVerified = x.IsEmailVerified;
          this.IsVerifySuccessfull = x.IsEmailVerified;
        } else {
          this.IsEmailVerified = false;
          this.showOrHideResendButton = true;

          this.ngOtpInputRefEmail.setValue("");
        }
        this.stop();
      }
    });
  }

  sentVerificationCode() {
    let userVerify = new HrEmpVerify();
    this.IsCountDownTimeOut = false;
    userVerify.Email = this.selectedEmail;
    userVerify.IsEmailVerified = this.IsEmailVerified;
    userVerify.IsPhoneVerified = true;

    if (this.IsEmailVerified == false) {
      this.ngOtpInputRefEmail.setValue("");
    }

    this.IsEmailVerified = null;
    this.showOrHideResendButton = false;
    this.isLoaderVisible = true;

    this.stop();
    this.userVerifyService.SendVerificationCode(userVerify).subscribe(
      (x) => {
        if (x) {
          this.start(10);

          this.IsSentVerificationCode = true;
          this.VerificationId = x.VerifyId;
          this.showOrHideResendButton = false;

          this.isLoaderVisible = false;
        } else {
          this.isLoaderVisible = false;
        }
      },
      (error) => {
        this.isLoaderVisible = false;
      }
    );
  }

  checkEmail(event) {
    this.emailCheck();
    this.searchEmailTextSubject$.next({
      email: this.orgForm.controls["Email"].value,
      Id: 0,
    });
  }

  emailCheck() {
    this.isSendOTPbutton = true;

    this.searchEmailTextSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchText) =>
          this.siteService.emailAlreayExists(searchText.email)
        )
      )
      .subscribe((status) => {
        this.emailExists = status;
        if (
          (this.selectedEmail != null ||
            this.selectedEmail != "" ||
            this.selectedEmail != undefined) &&
          !this.emailExists &&
          this.isEmailValid()
        ) {
          this.isSendOTPbutton = false;
        } else {
          this.isSendOTPbutton = true;
        }
      });
  }

  isEmailValid() {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.selectedEmail).toLowerCase());
  }

  passwordMatch(g: FormGroup) {
    return g.get("Password").value === g.get("ConfirmPassword").value
      ? null
      : { mismatch: true };
  }

  onEmailOtpChange(code) {
    this.selectedEmailOTP = code;
  }

  loadStartUpData() {
    this._userService.getCountryList().subscribe((x) => {
      if (x) {
        this.countryList = x;
      }
    });
  }

  loadProvince() {
    this._userService
      .getProvinceList(this.selectedCountry.CountryId)
      .subscribe((x) => {
        if (x) {
          this.ProvinceList = x;
        }
      });
  }

  loadDistrict() {
    this._userService
      .getDistrictList(this.selectedProvince.ProvinceId)
      .subscribe((x) => {
        if (x) {
          this.districtList = x;
          // console.log("this.districtList: ", this.districtList);
        }
      });
  }

  loadSubDistrict() {
    this._userService
      .getSubDistrictList(this.selectedDistrict.DistrictId)
      .subscribe((x) => {
        if (x) {
          this.SubDistrictList = x;
        }
      })
      .add(() => {
        if (this.districtList.length > 0) {
          this.loadPostalCodesByDistricId(this.selectedDistrict.DistrictId);
        }
      });
  }

  loadPostalCodesByDistricId(districtId: number) {
    this._userService
      .getPostalCodesByDistricId(districtId)
      .subscribe((res: GeneralResModel<GblPostalCode[]>) => {
        if (res.IsSucceed) {
          this.postalCodeList = res.Result;
        }
      });
  }

  saveOrUpdateHospital() {
    let hospitalForm = new FormData();
    if (this.selectedPackage != null && this.selectedPackage.PackageId > 0) {
      hospitalForm.append(
        "PackageId",
        this.selectedPackage.PackageId.toString()
      );
      hospitalForm.append("Rate", this.selectedPackage.Rate.toString());
    }

    if (this.selectedCountry) {
      hospitalForm.append(
        "CountryId",
        this.selectedCountry.CountryId.toString()
      );
    }
    if (this.selectedProvince) {
      hospitalForm.append(
        "ProvinceId",
        this.selectedProvince.ProvinceId.toString()
      );
    }

    if (this.selectedDistrict) {
      hospitalForm.append(
        "DistrictId",
        this.selectedDistrict.DistrictId.toString()
      );
    }

    if (this.selectedSubDistrict) {
      hospitalForm.append(
        "SubdistrictId",
        this.selectedSubDistrict.SubdistrictId.toString()
      );
    }

    if (this.selectedZipCode) {
      hospitalForm.append(
        "OrgZipCode",
        this.selectedZipCode.PostalCode.toString()
      );

      hospitalForm.append(
        "PostalCodeId",
        this.selectedZipCode.PostalCodeId.toString()
      );
    }

    if (this.isReferringHospital) {
      hospitalForm.append("IsReferring", "true");
    } else {
      hospitalForm.append("IsImaging", "true");
    }

    if (this.selectedSite?.length) {
      for (let i = 0; i < this.selectedSite?.length; i++) {
        hospitalForm.append("OrgIdS", this.selectedSite[i].OrgId.toString());
      }
    }

    hospitalForm.append("OrgName", this.selectedHospitalName);
    hospitalForm.append("OrgTel1", this.selectedTelNo ?? "");
    hospitalForm.append("OrgEmail1", this.selectedEmail);
    hospitalForm.append("OrgWebsite", this.selectedWebUrl ?? "");
    hospitalForm.append("HospitalLogoFile", this.HospitalLogoToUpload);
    if (this.selectedLineId) {
      hospitalForm.append("OrgLineId", this.selectedLineId);
    }

    hospitalForm.append("Fname", this.selectedFName);
    hospitalForm.append("Lname", this.selectedLName);
    hospitalForm.append("Pwd", this.selectedConfirmPassword);
    hospitalForm.append("PhoneMobile", this.selectedSiteAdminTelNo ?? "");
    if (this.selectedSiteAdminLineId) {
      hospitalForm.append("HrLineId", this.selectedSiteAdminLineId);
    }

    hospitalForm.append("profilePictureFile", this.ProfileImageToUpload);

    this.isLoaderVisible = true;

    this.siteService.addNewHospital(hospitalForm).subscribe(
      (x) => {
        if (x) {
          this.alertifyService.success(
            "Healthcare Service Provider created successfully"
          );
          window.open("http://localhost:4200/", "_self");
        } else {
          this.alertifyService.error(
            "Failed to create Healthcare Service Provider"
          );

          this.isLoaderVisible = false;
        }
      },
      (error) => {
        this.isLoaderVisible = false;
      }
    );
  }

  onUpload(event): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  myUploader(event): void {
    if (event.files.length === 0) {
      return;
    }
    this.ProfileImageToUpload = event.files[0];
  }

  onUploadHospitalLogo(event): void {
    for (const file of event.files) {
      this.uploadedFilesForHospitalLogo.push(file);
    }
  }

  myUploaderForHospitalLogo(event): void {
    if (event.files.length === 0) {
      return;
    }
    this.HospitalLogoToUpload = event.files[0];
  }

  start(time) {
    this.timer(time);
  }

  stop() {
    clearInterval(this.timerInterval);
  }
  checkVerifySuccessfull():Boolean{
    // alert(this.IsVerifySuccessfull);
    let succss = false;
    if (this.IsVerifySuccessfull===false || this.IsVerifySuccessfull===null) {
      succss =  true;
    }else{
      succss = true;
    }
    return succss;
  }
  timer(minute) {
    let seconds: number = minute * 60;
    let textSec: any = "0";
    let statSec: number = 60;

    const prefix = minute < 10 ? "0" : "";

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        this.IsCountDownTimeOut = true;
        this.showOrHideResendButton = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

}
