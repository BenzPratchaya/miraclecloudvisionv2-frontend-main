import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { GeneralResModel, SiteInformationModel, User } from 'src/app/core/models';
import { ExamDtoModel } from 'src/app/core/models/settings/exam-dto.model';
import { HrSubspecialty } from 'src/app/core/models/settings/radiologist-signup/HrSubspecialty';
import { RisExamDto } from 'src/app/core/models/settings/ris-exam-dto.model';
import { MessageConstant } from 'src/app/core/models/shared/message.constant';
import { LocalStorageService, SiteService } from 'src/app/core/services';
import { AlertifyService } from 'src/app/core/services/common/toast/alertify.service';
import { ExamInfoService } from 'src/app/core/services/settings/exam-info.service';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-exam-info',
  templateUrl: './exam-info.component.html',
  styleUrls: ['./exam-info.component.scss']
})
export class ExamInfoComponent implements OnInit {
  activityValues: number[] = [0, 100];

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  @ViewChild("dt", { static: true })
  dt!: Table;
  cols!: any[];
  selectedColumns!: any[];
  client: User = new User();
  // loaderVisible: boolean = false;
  checkedExamFlag: boolean = false;
  examData: RisExamDto[] = [];
  examAddOrUpdateContent!: string;
  isvisibleExamAddOrUpdateDialog: boolean = false;
  examAddOrUpdateForm!: FormGroup;
  examRequest: ExamDtoModel = new ExamDtoModel();
  orgId: number=0;
  siteList: SiteInformationModel[] = [];
  subSpecialtyList: HrSubspecialty[] = [];
  examPatchData: ExamDtoModel = new ExamDtoModel();
  uidCounter = 1;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _examInfoService: ExamInfoService,
    private _alertifyService:AlertifyService,
    private _siteService: SiteService
  ) {}

  ngOnInit(): void {
    this.basicInitialization();
  }

  private getAllExam(orgId: number) {
    this.loading = true;
    this._examInfoService
      .getAllExam(orgId)
      .subscribe((res: GeneralResModel<RisExamDto[]>) => {
        if (res.IsSucceed) {
          this.loading = false;
          this.examData = res.Result as RisExamDto[];
        }
      });
    this.loading = false;
  }

  private examInfoGrid() {
    this.cols = [
      { field: "ExamId", header: "Exam ID" },
      { field: "ExamUid", header: "Exam UID" },
      { field: "ExamName", header: "Exam Name" },
      { field: "Rate", header: "Rate" },
      { field: "SubspecialtyName", header: "Subspecialty" },
    ];

    this.selectedColumns = this.cols;
  }

  private loadSubspecialist() {
    this._userService.getSubSpecialtyList().subscribe((x) => {
      if (x) {
        this.subSpecialtyList = x;
      }
    });
  }




  openAddOrUpdateExamDialog(x: string, rowData: ExamDtoModel| null) {
    console.log(rowData);
    if (this.client.OrgType == "SP") {
      this.getHospitalList();
      this.examAddOrUpdateForm.get("OrgId").setValidators(Validators.required);
      this.examAddOrUpdateForm.get("OrgId").updateValueAndValidity();
    } else {
      this.orgId = this.client.OrgId;
    }
    if (rowData != null) {
      this.examAddOrUpdateForm.patchValue({
        OrgId: rowData.OrgId,
        ExamId: rowData.ExamId,
        ExamUid: rowData.ExamUid,
        ExamName: rowData.ExamName,
        Rate: rowData.Rate,
        SubspecialtyId: rowData.SubspecialtyId,
        GovtId: rowData.GovtId,
        ServiceTypeId: rowData.ServiceTypeId,
  
  
      });



      this.examPatchData = rowData;
    }

    this.examAddOrUpdateContent = x;
    this.isvisibleExamAddOrUpdateDialog = true;
  }

  closeExamAddOrUpdateDialog() {
    this.examAddOrUpdateForm.reset({
      OrgId: "",
      ExamId: "",
      ExamUid: "",
      ExamName: "",
      Rate: "",
      GovtId: "",
      ExamTypeId: "",
      CategoryId: "",
      ServiceTypeId: "",
      SubspecialtyId: ""
    });

    this.examRequest = new ExamDtoModel();
    this.examPatchData = new ExamDtoModel();
    this.isvisibleExamAddOrUpdateDialog = false;
  }

  onSubmitForAddOrEditExam() {
    this.loading = true;

    if (!this.examAddOrUpdateForm.valid) {
      this._alertifyService.error(MessageConstant.ProvideValidDate)
      this.loading = false;
      return;
    }

    if (this.examAddOrUpdateContent !== "Edit Exam") {
      this.addExamInformation();
    } else {
      this.updateExamInformation();
    }
  }

  private addExamInformation() {
    this.examRequest = this.examAddOrUpdateForm.value;
    this.examRequest.AnalyzeritemId =
      this.examAddOrUpdateForm.get("ItemId")?.value;
    this.examRequest.ServiceType = 1;
    this.examRequest.OrgId = this.orgId;
    this.examRequest.ExamId = 0;

    this._examInfoService.addExamInformation(this.examRequest).subscribe(
      (res: GeneralResModel<ExamDtoModel>) => {
        if (res.IsSucceed) {
          this.handleSuccessAddExam();
        } else {
          this.handleError("An error occurred while adding an Exam data.");
        }
      },
      (error) => {
        this.handleError("An error occurred while adding an Exam data.");
      }
    );
  }

  private handleSuccessAddExam() {
    this._alertifyService.success(MessageConstant.Success);
    this.examRequest = new ExamDtoModel();
    this.getAllExam(this.orgId);
    this.closeExamAddOrUpdateDialog();
    this.loading = false;
  }

  private updateExamInformation() {
    this.examRequest = this.examAddOrUpdateForm.value;
    this.examRequest.AnalyzeritemId =
      this.examAddOrUpdateForm.get("ItemId")?.value;
    this.examRequest.ServiceType = 1;
    this.examRequest.OrgId = this.orgId;
    this.examRequest.ExamId = this.examPatchData.ExamId;

    this._examInfoService.updateExamInformation(this.examRequest).subscribe(
      (res: GeneralResModel<ExamDtoModel>) => {
        if (res.IsSucceed) {
          this.handleSuccessUpdateExam();
        } else {
          this.handleErrorForUpdateExam(
            "An error occurred while updating an Exam data."
          );
        }
      },
      (error) => {
        this.handleErrorForUpdateExam(
          "An error occurred while updating an Exam data."
        );
      }
    );
  }

  private handleSuccessUpdateExam() {
    this._alertifyService.success(MessageConstant.Success);
    this.getAllExam(this.orgId);
    this.closeExamAddOrUpdateDialog();
    this.loading = false;
  }

  private handleError(errorMessage: string) {
    this.examRequest = new ExamDtoModel();
    this.examAddOrUpdateForm.reset();
    this._alertifyService.error(errorMessage);
    this.loading = false;
  }

  private handleErrorForUpdateExam(errorMessage: string) {
    // this.examRequest = new ExamDtoModel();
    // this.examAddOrUpdateForm.reset();
  
    this._alertifyService.error(errorMessage);
    this.loading = false;
  }

  private createForm() {
    this.examAddOrUpdateForm = this._fb.group({
      OrgId: [0, []],
      ExamId: [0, []],
      ExamUid: ["", [Validators.required]],
      ExamName: ["", [Validators.required]],
      GovtId: [0, []],
      Rate: [0, [Validators.required]],
      ExamTypeId: [0, []],
      ServiceTypeId: [0, []],
      SubspecialtyId: [0, []],
    });

    this.examAddOrUpdateForm.reset();
  }

  generateExamUid() {
    const examName = this.examAddOrUpdateForm.get("ExamName")?.value;
    const cleanedExamName = this.removeSpecialCharacters(examName);

    const firstLetters = cleanedExamName
      .split(" ")
      .map((word) => word.charAt(0))
      .join("");

    const examUid = `${firstLetters}-${String(this.uidCounter).padStart(
      3,
      "0"
    )}`;
    this.uidCounter++;
    this.examAddOrUpdateForm.get("ExamUid")?.setValue(examUid);
  }

  private removeSpecialCharacters(inputString: string): string {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    return inputString.replace(regex, "");
  }



  private getHospitalList() {
    this._siteService.getHospitalList().subscribe((res: SiteInformationModel[]) => {
      this.siteList = res;
      this.orgId = this.siteList[0].OrgId;
    });
  }


  private basicInitialization() {
    this.client = LocalStorageService.getUserStorageValue();

    if (this.client != null) {
      if (this.orgId == null) {
        if (this.client.OrgType.toUpperCase() == "SP") {
          this.getHospitalList();
        } else {
          this.orgId = this.client.OrgId;
        }
      }
    }

    this.createForm();
    this.examInfoGrid();
    this.loadSubspecialist();
    this.getAllExam(this.client.OrgId);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
}
