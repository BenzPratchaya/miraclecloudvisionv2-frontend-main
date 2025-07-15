import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppUtilities } from 'src/app/core/helpers';
import { GblReferralModel, GeneralResModel, MessageConstant, RisExamModel, StudyModel, User } from 'src/app/core/models';
import { OrgResponseViewModel } from 'src/app/core/models/study/org-response-view.model';
import { HrEmpOrgMappingModel } from 'src/app/core/models/user-models/hr-emp-org-mapping.model';
import { AlertifyService, GenderService, LocalStorageService, OrderImportService, OrderService } from 'src/app/core/services';
import { UserService } from 'src/app/core/services/settings/user.service';
import { trimValidator } from 'src/app/core/validators/trim.validator';

@Component({
  selector: 'app-order-reconcile',
  templateUrl: './order-reconcile.component.html',
  styleUrls: ['./order-reconcile.component.scss']
})
export class OrderReconcileComponent  implements OnInit, OnDestroy {
  orderRowData: StudyModel = new StudyModel();
  studyWorklistData: StudyModel = new StudyModel();

  @Output("reloadOrderParentFunc")
  reloadOrderParentFunc: EventEmitter<any> =
    new EventEmitter();

  @Output("isVisibleOrderReconcileDialog") isVisibleOrderReconcileDialog: EventEmitter<boolean> = new EventEmitter();

  client: User = new User();
  maxYear = new Date().getFullYear();
  maxMonth = new Date().getMonth() + 1;
  maxDay = new Date().getDate();
  toDate: Date = new Date();
  _orderReconcileForm!: FormGroup;
  genders = this._genderService.genders;
  selectedGender: any;
  orgWiseExamList: RisExamModel[] = [];
  orgWiseNewExamList: RisExamModel[] = [];
  selectedEditExam: RisExamModel = new RisExamModel();
  orgWiseExamListExamHospitalImaging: RisExamModel[] = [];
  selectedEditExamHospitalImaging: RisExamModel = new RisExamModel();
  studyInputText: string = "";
  orderEditRequest: StudyModel = new StudyModel();
  isShoButton: boolean = false;
  radiologistData: HrEmpOrgMappingModel[] = [];
  selectedRadiologist: HrEmpOrgMappingModel = new HrEmpOrgMappingModel();
  referralNameList: GblReferralModel[] = [];
  newReferralNameList: GblReferralModel[] = [];
  selectedReferralName: GblReferralModel;
  referralNameInputText: string = "";
  referralNameAdd: GblReferralModel = new GblReferralModel();
  selectedEditStudy: StudyModel = new StudyModel();
  isVisiblePreLoader: boolean = false;
  private _subscription: Subscription;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _orderService: OrderService,
    private _genderService: GenderService,
    private _alertifyService: AlertifyService,
    private _orderImportService: OrderImportService,
    private _confirmationService: ConfirmationService,
  ) {
    this.orderReconcileFormInit();
    this.getOrderRowData();
  }

  ngOnInit(): void {
    this.basicInit();
  }

  private basicInit() {
    this.client = LocalStorageService.getUserStorageValue();
    if(this.client.IsReferring) {
      this.orderReconcileSomeFieldsNotMandatory();
    }

      if (this.client.IsSsnmandatory) {
        this._orderReconcileForm.get("SSN").setValidators([Validators.required]);
        this._orderReconcileForm.get("SSN").updateValueAndValidity();
      }
  }

  private getOrderRowData() {
    this._subscription = this._orderService.rowData$.subscribe(data => {
      this.orderRowData = data;
      this.studyWorklistData = this.orderRowData;
      if(this.orderRowData) {
        this.selectedEditStudy = this.orderRowData;
        this.getEmpOrgMapping(2, this.orderRowData.OrgId);
        this.getAllExamsByOrgId(this.orderRowData.OrgId);
        this.getAllExamsByImagingOrgId(this.orderRowData.OrgIdreferto);
        this.selectedGender = this.genders.find(
          (g) => g.value == this.orderRowData.Gender
        );
        this.selectedEditStudy.Dob = new Date(this.orderRowData.Dob);
        this.selectedEditStudy.OrderDt = new Date(this.orderRowData.OrderDt);
        this.orderReconcileFormPatchValue();
      }
    });
  }

  private orderReconcileFormInit() {
    this._orderReconcileForm = this._fb.group({
      Hn: ["", []],
      SSN: [""],
      Title: [""],
      TitleEng: [""],
      Fname: ["", []],
      Lname: ["", []],
      FnameEng: ["", []],
      LnameEng: ["", []],
      Dob: ["", []],
      Gender: ["", []],
      AccessionNo: ["", []],
      OrderDt: ["", []],
      ExamName: ["", []],
      HospitalHn: ["", []],
      HospitalAccessionNo: ["", []],
      HospitalExamId: [""],
      HospitalExamName: ["", []],

      HospitalFname: ["", []],
      HospitalLname: ["", []],
      HospitalTitle: ["", []],   


    });
  }

  private orderReconcileSomeFieldsNotMandatory() {
    this._orderReconcileForm.get("HospitalHn").setValidators([]);
    this._orderReconcileForm.get("HospitalHn").updateValueAndValidity();

    this._orderReconcileForm.get("HospitalAccessionNo").setValidators([]);
    this._orderReconcileForm.get("HospitalAccessionNo").updateValueAndValidity();

    this._orderReconcileForm.get("HospitalExamName").setValidators([]);
    this._orderReconcileForm.get("HospitalExamName").updateValueAndValidity();
  }

  private orderReconcileFormPatchValue() {
    this._orderReconcileForm.patchValue({
      Hn: this.orderRowData.Hn,
      SSN: this.orderRowData.SSN,
      Title: this.orderRowData.Title,
      Fname: this.orderRowData.Fname,
      Lname: this.orderRowData.Lname,
      TitleEng: this.orderRowData.TitleEng,
      FnameEng: this.orderRowData.FnameEng,
      LnameEng: this.orderRowData.LnameEng,
      Dob: this.orderRowData.Dob,
      Gender: this.orderRowData.Gender,
      AccessionNo: this.orderRowData.AccessionNo,
      OrderDt: this.orderRowData.OrderDt,
      ExamName: this.orderRowData.ExamName,
      HospitalHn: this.orderRowData.HospitalHn,
      HospitalAccessionNo: this.orderRowData.HospitalAccessionNo,
      HospitalExamId: this.orderRowData.HospitalExamId,
      HospitalExamName: this.orderRowData.HospitalExamName,

      HospitalFname: this.orderRowData.HospitalFname,
      HospitalLname: this.orderRowData.HospitalLname,
      HospitalTitle: this.orderRowData.HospitalTitle,
    });
  }

  private getAllExamsByOrgId(orgId: number) {
    this._orderImportService
      .getAllExamsByOrg(orgId)
      .subscribe((res: RisExamModel[]) => {
        this.orgWiseExamList = res;
        this.orgWiseNewExamList = this.orgWiseExamList;
      })
      .add(() => {
        if (this.orgWiseExamList.length > 0) {
          this.defaultSelectedExamDropdownData();
        }
      });
  }

  private getAllExamsByImagingOrgId(orgId: number) {
    this._orderImportService
      .getAllExamsByOrg(orgId)
      .subscribe((res: RisExamModel[]) => {
        this.orgWiseExamListExamHospitalImaging = res;
      })
      .add(() => {
        if (this.orgWiseExamListExamHospitalImaging.length > 0) {
          this.defaultSelectedExamDropdownData();
        }
      });
  }

  private defaultSelectedExamDropdownData() {
    this.selectedEditExam = this.orgWiseExamList.find(
      (e) => e.ExamId === this.orderRowData.ExamId
    );
    this.selectedEditExamHospitalImaging = this.orgWiseExamListExamHospitalImaging.find(
      (e) => e.ExamId === this.orderRowData.HospitalExamId
    );
    if (this.studyInputText !== "") {
      this.selectedEditExam = this.orgWiseExamList.find(
        (e) => e.ExamName === this.studyInputText
      );
      this.studyInputText = "";
    }
  }

  private getEmpOrgMapping(jobtypeId: number, orgId: number) {
    this._userService
      .getEmpOrgMapping(jobtypeId, orgId)
      .subscribe((res: GeneralResModel<HrEmpOrgMappingModel[]>) => {
        if (res.IsSucceed) {
          this.radiologistData = res.Result;
        }
      })
      .add(() => {
        if (this.orderRowData.AssignedTo > 0) {
          this.selectedRadiologist = this.radiologistData.find(
            (x) => x.EmpId == this.orderRowData.AssignedTo
          );
        } else {
          this.selectedRadiologist = this.radiologistData.find(
            (x) => x.IsDefault == true
          );
        }
      });
  }


  onSubmitOrderReconcile(): void {
    if (this._orderReconcileForm.valid) {
      const formData = this._orderReconcileForm.value;

      this.selectedEditStudy.Hn = formData.Hn;
      this.selectedEditStudy.SSN = formData.SSN;

      this.selectedEditStudy.Title = formData.Title;
      this.selectedEditStudy.Fname = formData.Fname;
      this.selectedEditStudy.Lname = formData.Lname;

      this.selectedEditStudy.TitleEng = formData.TitleEng;
      this.selectedEditStudy.FnameEng = formData.FnameEng;
      this.selectedEditStudy.LnameEng = formData.LnameEng;

      this.selectedEditStudy.Gender = this.selectedGender.value;
      this.selectedEditStudy.AccessionNo = formData.AccessionNo;
      this.selectedEditStudy.OrderDt = formData.OrderDt;
      this.selectedEditStudy.ExamName = this.selectedEditExam.ExamName;
      this.selectedEditStudy.ExamId = this.selectedEditExam.ExamId;

      this.selectedEditStudy.UserId = this.client.EmpId;
      this.selectedEditStudy.LastModifiedBy = this.client.EmpId;

      if(this.selectedEditExamHospitalImaging != null) {
        this.selectedEditStudy.HospitalExamId = this.selectedEditExamHospitalImaging?.ExamId;
        this.selectedEditStudy.HospitalExamName = this.selectedEditExamHospitalImaging.ExamName;
      }

      this.selectedEditStudy.HospitalAccessionNo = formData.HospitalAccessionNo;
      this.selectedEditStudy.HospitalHn = formData.HospitalHn;

      this.selectedEditStudy.HospitalFname = formData.HospitalFname;
      this.selectedEditStudy.HospitalLname = formData.HospitalLname;
      this.selectedEditStudy.HospitalTitle = formData.HospitalTitle;

      this._confirmationService.confirm({
            key: "saveStudyExam",
            message: "Do you want to update order?",
            accept: () => {
              this.isVisiblePreLoader = true;
              this._orderService.submitStudy(this.selectedEditStudy).subscribe(
                (res: boolean) => {
                  if (res) {
                    this.reloadOrderParentFunc.emit();
                    this.isVisibleOrderReconcileDialog.emit(true);
                    this.getOrderRowData();
                    this._alertifyService.success(MessageConstant.OrderUpdated);
                    this.isVisiblePreLoader = false;
                    //this._orderReconcileForm.reset();
                  } else {
                    this.isVisiblePreLoader = false;
                    this._alertifyService.error(MessageConstant.SomethingWrong);
                  }
                },
                (resError) => {
                  this.isVisiblePreLoader = false;
                  this._alertifyService.error(MessageConstant.SomethingWrong);
                }
              );
            },
            reject: () => {
              this._alertifyService.info(MessageConstant.DenyAction);
              return;
            },
          });
    } else {
      this._alertifyService.error(MessageConstant.SomethingWrong);
    }
  }

  getPatientValidatity(){
    
    let ssn = this._orderReconcileForm.get('SSN').value;
    if (this.client.IsSsnmandatory) {
      if (!ssn) {
        this._alertifyService.warning('Patient SSN is Required');
        return;
      }
    }
    let accssion = this._orderReconcileForm.get('AccessionNo').value;
    let orderId = this.orderRowData.OrderId;
    let userId = this.client.EmpId;

    this._orderService.getPatientValidaty(orderId,accssion,userId,ssn).subscribe((res)=>{
        if (res.Result) {
          let orgResponse = res.Result as OrgResponseViewModel;
          this._orderReconcileForm.patchValue(
            {
              HospitalFname: orgResponse.FirstName,
              HospitalLname: orgResponse.LastName,
              HospitalTitle: orgResponse.Title,
              HospitalHn: orgResponse.HN,
              HospitalExamName: orgResponse.ExamName,
              HospitalExamId: orgResponse.ExamId,
            }
          );
        }
    });
  }
  closeOrderReconcileDialogFromChild() {
    this.isVisibleOrderReconcileDialog.emit(true);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
