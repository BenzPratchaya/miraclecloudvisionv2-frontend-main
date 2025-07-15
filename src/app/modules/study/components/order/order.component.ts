import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { AppUtilities, OrderSortingHelper, OrderSortingOption } from 'src/app/core/helpers';
import { GeneralResModel, MessageConstant, OrderFilterViewModel, OrderSortingViewModel, ReferToHospitalRequestModel, SiteInformationModel, StudyModel, StudySearchQueryModel, User } from 'src/app/core/models';
import { AlertifyService, LocalStorageService, OrderService, SiteService } from 'src/app/core/services';
import { UtilityService } from 'src/app/core/services/common/utility/utility.service';
import QRCode from 'qrcode';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class OrderComponent implements OnInit, OnDestroy {

  @ViewChild("dv") dataView;

  url:string = "";
  minToDate!: Date;
  toDate: Date = new Date();
  fromDate: Date = new Date();
  selectedDate: Date = new Date();
  orgId?: number = 0;
  client: User = new User();
  isCollapsed: boolean[] = [];
  orderData?: StudyModel[] = [];
  orderRowData: StudyModel = new StudyModel();
  studyWorklistData: StudyModel = new StudyModel();
  selectedSite?: SiteInformationModel;
  siteList: SiteInformationModel[] = [];
  imagingSiteList: SiteInformationModel[] = [];
  selectedImagingSite: SiteInformationModel;
  studySearchQuery: StudySearchQueryModel = new StudySearchQueryModel();
  valSwitch: boolean = false;
  isActiveInboxBtn: boolean = false;
  isActiveSentBtn: boolean = false;
  isActiveUnassignedBtn: boolean = false;
  isVisiblePreLoader: boolean = false;
  isVisbleDicomUploadBtn: boolean = false;
  isVisibleDicomUploadDialog: boolean = false;
  isVisibleOrderDocumentDialog: boolean = false;
  isVisibleOrderReconcileDialog: boolean = false;

  sortByOptions: OrderSortingViewModel[] = [];
  sortByOptionsSelected: OrderSortingViewModel = new OrderSortingViewModel();
  sortByOptionsImaging: OrderSortingViewModel[] = [];
  sortByOptionsImagingSelected: OrderSortingViewModel = new OrderSortingViewModel();
  orderFilterByOptions: OrderFilterViewModel[] = [];
  orderFilterByOptionsSelected: OrderFilterViewModel = new OrderFilterViewModel();
  orderFilterByOptionsForImagingHospital: OrderFilterViewModel[] = [];
  orderFilterByOptionsForImagingHospitalSelected: OrderFilterViewModel = new OrderFilterViewModel();

  constructor(
    private _siteService: SiteService,
    private _orderService: OrderService,
    private _alertifyService: AlertifyService,
    private _confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.basicInit();
  }

  private basicInit() {
    this.client = LocalStorageService.getUserStorageValue();
    this.url = 'https://start.mray.app/client/?serverurl=cloudmray.com&login=vet&pass=123456&accessionnumber=7201';
    this.isCollapsed = [];
    this.shortOptions();
    this.shortOptionsImaging();
    this.getHospitalList();
    this.orderFilterOptions();
    this.orderFilterOptionsForImagingHospital();
    if(this.client.OrgId > 0) {
      this.getHospitalListByOrgId(this.client.OrgId, "Referring");
    }
  }

  private orderFilterOptions() {
    this.orderFilterByOptions = [
      { label: 'All', value: 'All', isAccepted: false, pacsIssent: false },
      { label: 'Completed', value: 'C', isAccepted: false, pacsIssent: false },
      { label: 'Submitted', value: 'A', isAccepted: false, pacsIssent: false },
      { label: 'Pending', value: 'P', isAccepted: false, pacsIssent: false },
      { label: 'Accepted', value: 'A', isAccepted: true, pacsIssent: false },
      { label: 'Finalized', value: 'F', isAccepted: false, pacsIssent: true },
    ];

    this.orderFilterByOptionsSelected = this.orderFilterByOptions.find(x => x.value === "All");
  }

  private orderFilterOptionsForImagingHospital() {
    this.orderFilterByOptionsForImagingHospital = [
      { label: 'All', value: 'All', isAccepted: false, pacsIssent: false },
      { label: 'Submitted', value: 'A', isAccepted: false, pacsIssent: false },
      { label: 'Pending', value: 'P', isAccepted: false, pacsIssent: false },
      { label: 'Accepted', value: 'A', isAccepted: true, pacsIssent: false },
      { label: 'Finalized', value: 'F', isAccepted: false, pacsIssent: true },
    ];

    this.orderFilterByOptionsForImagingHospitalSelected = this.orderFilterByOptionsForImagingHospital.find(x => x.value === "All");
  }

  private shortOptions() {
    this.sortByOptions = [
      { label: 'Completed', value: 'Completed_ASC'},
      { label: 'Completed', value: 'Completed_DSC' },
      { label: 'Submitted', value: 'Submitted_ASC' },
      { label: 'Submitted', value: 'Submitted_DSC' },
      { label: 'Accepted', value: 'Accepted_ASC' },
      { label: 'Accepted', value: 'Accepted_DSC'},
    ];

    this.sortByOptionsSelected = this.sortByOptions.find(f => f.value === "Completed_DSC");
  }

  private shortOptionsImaging() {
    this.sortByOptionsImaging = [
      { label: 'Submitted', value: 'Submitted_ASC' },
      { label: 'Submitted', value: 'Submitted_DSC' },
      { label: 'Accepted', value: 'Accepted_ASC' },
      { label: 'Accepted', value: 'Accepted_DSC'},
    ];

    this.sortByOptionsImagingSelected = this.sortByOptionsImaging.find(f => f.value === "Submitted_DSC");
  }

  onSortChange(event: any) {
    this.getSentOrders();
  }

  onSortChangeImaging(event: any) {
    this.getInboxOrders();
  }

  onClearOrderSortBy() {
    this.sortByOptionsSelected = this.sortByOptions.find(f => f.value === "Completed_DSC");
    this.getSentOrders();
  }

  onClearOrderSortByImaging() {
    this.sortByOptionsImagingSelected = this.sortByOptionsImaging.find(f => f.value === "Submitted_DSC");
    this.getInboxOrders();
  }

  onInputChange(dv: any, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    dv.filter(inputElement.value);
  }

  onFilterChange(event: any) {
    this.getSentOrders();
  }

  onFilterChangeImaging(event: any) {
    this.getInboxOrders();
  }

  onClearOrderFilter() {
    this.orderFilterByOptionsSelected = this.orderFilterByOptions.find(x => x.value === "All");
    this.getSentOrders();
  }

  onClearOrderFilterImaging() {
    this.orderFilterByOptionsForImagingHospitalSelected = this.orderFilterByOptionsForImagingHospital.find(x => x.value === "All");
    this.getInboxOrders();
  }

  private getHospitalList() {
    this._siteService.getHospitalList().subscribe((res: SiteInformationModel[]) => {
      this.siteList = res;
      if(this.client.OrgType.toUpperCase() === "SP") {
        this.selectedSite = this.siteList[0];
        this.orgId = this.selectedSite.OrgId;
      } else if(this.client.OrgType.toUpperCase() === "HOSPITAL") {
        this.siteList = [];
        let siteListData = new SiteInformationModel(
          this.client.OrgName,
          this.client.OrgId,
          this.client.IsImaging,
          this.client.IsReferring
        );
        siteListData.OrgId = this.client.OrgId;
        siteListData.OrgName = this.client.OrgName;
        siteListData.OrgParentId = this.client.OrgParentId;
        this.siteList.push(siteListData);
        this.selectedSite = this.siteList.find(x => x.OrgId === this.client.OrgId);
        this.orgId = this.client.OrgId;
      } else {
        console.log("Something went wrong...");
      }
    }).add(() => {
      if(this.client.OrgType.toUpperCase() === "HOSPITAL" && this.selectedSite?.IsReferring) {
        this.isActiveSentBtn =true;
        this.getSentOrders();
      }

      if(this.client.OrgType.toUpperCase() === "HOSPITAL" && this.selectedSite?.IsImaging) {
        this.isActiveInboxBtn = true;
        this.getInboxOrders();
      }
    });
  }

  private getHospitalListByOrgId(orgId: number, type: string) {
    this._siteService.getHospitalListByOrgId(orgId, type).subscribe((res: SiteInformationModel[]) => {
      if(res.length > 0) {
        this.imagingSiteList = res;
        this.selectedImagingSite = this.imagingSiteList.find(x => x.IsDefault === true);
      }
    });
  }

  getInboxOrders() {
    this.isCollapsed = [];
    this.isActiveInboxBtn = true;
    this.isActiveSentBtn = false;
    this.isActiveUnassignedBtn = false;
    this.isVisiblePreLoader = true;
    this.studySearchQuery.OrgId = this.orgId;
    this.studySearchQuery.FromDate = this.fromDate.toDateString();
    this.studySearchQuery.ToDate = this.toDate.toDateString();

    if(this.client.IsReferring) {
      this.studySearchQuery.Status = this.orderFilterByOptionsSelected.value;
      this.studySearchQuery.IsAccepted = this.orderFilterByOptionsSelected.isAccepted;
      this.studySearchQuery.PacsIssent = this.orderFilterByOptionsSelected.pacsIssent;
      this.studySearchQuery.ShortBy = this.sortByOptionsSelected.value;
    }

    if(this.client.IsImaging) {
      this.studySearchQuery.Status = this.orderFilterByOptionsForImagingHospitalSelected.value;
      this.studySearchQuery.IsAccepted = this.orderFilterByOptionsForImagingHospitalSelected.isAccepted;
      this.studySearchQuery.PacsIssent = this.orderFilterByOptionsForImagingHospitalSelected.pacsIssent;
      this.studySearchQuery.ShortBy = this.sortByOptionsImagingSelected.value;
    }

    this._orderService.getInboxOrders(this.studySearchQuery).subscribe((res: GeneralResModel<StudyModel[]>) => {
      if(res.IsSucceed) {
        this.orderData = res.Result;
        this.orderData.forEach(obj => {
          obj.SearchField = `${obj.Hn} ${obj.Fname} ${obj.Lname} ${obj.PatientName} ${obj.SSN} ${obj.ExamName} ${obj.ModalityName} ${obj.AccessionNo} ${obj.Status} ${obj.StatusName} ${obj.AssignedToName} ${obj.OrgName}`;
        });
        this._orderService.setOrderData(this.orderData);
        console.log("this.orderData: ", this.orderData);
        this.isVisiblePreLoader = false;
      }
    });
  }

  getSentOrders() {
    this.isCollapsed = [];
    this.isActiveInboxBtn = false;
    this.isActiveSentBtn = true;
    this.isActiveUnassignedBtn = false;
    this.isVisiblePreLoader = true;
    this.studySearchQuery.OrgId = this.orgId;
    this.studySearchQuery.FromDate = this.fromDate.toDateString();
    this.studySearchQuery.ToDate = this.toDate.toDateString();

    if(this.client.IsReferring) {
      this.studySearchQuery.Status = this.orderFilterByOptionsSelected.value;
      this.studySearchQuery.IsAccepted = this.orderFilterByOptionsSelected.isAccepted;
      this.studySearchQuery.PacsIssent = this.orderFilterByOptionsSelected.pacsIssent;
      this.studySearchQuery.ShortBy = this.sortByOptionsSelected.value;
    }

    if(this.client.IsImaging) {
      this.studySearchQuery.Status = this.orderFilterByOptionsForImagingHospitalSelected.value;
      this.studySearchQuery.IsAccepted = this.orderFilterByOptionsForImagingHospitalSelected.isAccepted;
      this.studySearchQuery.PacsIssent = this.orderFilterByOptionsForImagingHospitalSelected.pacsIssent;
      this.studySearchQuery.ShortBy = this.sortByOptionsImagingSelected.value;
    }

    this._orderService.getSentOrders(this.studySearchQuery).subscribe((res: GeneralResModel<StudyModel[]>) => {
      if(res.IsSucceed) {
        this.isVisbleDicomUploadBtn = true;
        this.orderData = res.Result;
        this.orderData.forEach(obj => {
          obj.SearchField = `${obj.Hn} ${obj.Fname} ${obj.Lname} ${obj.PatientName} ${obj.SSN} ${obj.ExamName} ${obj.ModalityName} ${obj.AccessionNo} ${obj.Status} ${obj.StatusName} ${obj.AssignedToName} ${obj.OrgName}`;
        });
        this.orderData = this.orderData?.filter(item => item.OrgIdreferto !== null);
        this._orderService.setOrderData(this.orderData);
        this.isVisiblePreLoader = false;
      }
    });
  }

  getUnassignedOrders() {
    this.isCollapsed = [];
    this.isActiveInboxBtn = false;
    this.isActiveSentBtn = false;
    this.isActiveUnassignedBtn = true;
    this.isVisiblePreLoader = true;
    this.studySearchQuery.OrgId = this.orgId;
    this.studySearchQuery.FromDate = this.fromDate.toDateString();
    this.studySearchQuery.ToDate = this.toDate.toDateString();
    this._orderService.getSentOrders(this.studySearchQuery).subscribe((res: GeneralResModel<StudyModel[]>) => {
      if(res.IsSucceed) {
        this.orderData = res.Result;
        this.orderData = this.orderData?.filter(item => item.OrgIdreferto == null);
        this._orderService.setOrderData(this.orderData);
        this.isVisiblePreLoader = false;
      }
    });
  }

  openDicomUploadDialog() {
    this.isVisibleDicomUploadDialog = true;
  }

  closeDicomUploadDialog() {
    this.isVisibleDicomUploadDialog = false;
  }

  closeDicomUploadDialogFromChild(event: any) {
    if(event) {
      this.isCollapsed = [];
      this.isVisibleDicomUploadDialog = false;
    }
  }

  openOrderReconcileDialog(rowData: StudyModel) {
    this._orderService.setOrderRowData(rowData);
    this.orderRowData = rowData;
    if(this.orderRowData != null) {
      this.isVisibleOrderReconcileDialog = true;
    }
  }

  closeOrderReconcileDialog() {
    this.isCollapsed = [];
    this.isVisibleOrderReconcileDialog = false;
  }

  closeOrderReconcileDialogFromChild(event: any) {
    if (event) {
      this.isVisibleOrderReconcileDialog = false;
    }
  }

  calculateAge(dob: Date) {
    return  AppUtilities.calculateAge(dob);
  }

  orderSubmit(rowData: StudyModel) {
    this._confirmationService.confirm({
      key: "submitOrder",
      message: "Do you want to submit this order?",
      accept: () => {
        rowData.TatsetupId = 1;
        rowData.ServiceType = 1;
        rowData.Status = "A";
        rowData.UserId = this.client.EmpId;
        rowData.LastModifiedBy = this.client.EmpId;
        this._orderService.submitStudy(rowData).subscribe(
          (res: boolean) => {
            if (res) {
              this.getSentOrders();
              this._alertifyService.success(MessageConstant.OrderSubmitted);
            } else {
              this._alertifyService.error(MessageConstant.SomethingWrong);
            }
          });
      },
      reject: () => {
        this._alertifyService.info(MessageConstant.DenyAction);
      },
    });
  }

  orderAccept(rowData: StudyModel) {
    rowData.AcceptedBy = this.client.EmpId;
    rowData.LastModifiedBy = this.client.EmpId;

    this._confirmationService.confirm({
      key: "acceptOrder",
      message: "Do you want to accept this order?",
      accept: () => {
        this._orderService.acceptedStudy(rowData).subscribe(
          (res: GeneralResModel<boolean>) => {
            if (res.IsSucceed) {
              this.getInboxOrders();
              this._alertifyService.success(MessageConstant.OrderAccepted);
            } else {
              this._alertifyService.error(MessageConstant.SomethingWrong);
            }
          });
      },
      reject: () => {
        this._alertifyService.info(MessageConstant.DenyAction);
      },
    });
  }

  orderAssign(rowData: StudyModel) {
    const referToRequest = new ReferToHospitalRequestModel();
    referToRequest.UserId = this.client.EmpId;
    referToRequest.OrderId = rowData.OrderId;
    referToRequest.OrgIdReferTo = this.selectedImagingSite.OrgId;

    this._orderService.referToToHospital(referToRequest).subscribe((res: boolean) => {
      if(res) {
        this.getSentOrders();
        this._alertifyService.success(MessageConstant.OrderAssigned);
      } else {
        this.isVisiblePreLoader = false;
        this._alertifyService.error(MessageConstant.SomethingWrong);
      }
    });
  }

  reloadOrderParentFunc() {
    if(this.isActiveSentBtn) {
      this.getSentOrders();
    }

    if(this.isActiveInboxBtn) {
      this.getInboxOrders();
    }

    if(this.isActiveUnassignedBtn) {
      this.getUnassignedOrders();
    }
  }

  onSelectFromDate(e: any) {
    if (this.fromDate < this.toDate) {
      this.minToDate = this.fromDate;
    } else if (this.fromDate >= this.toDate) {
      this.fromDate = new Date(e);
      this.toDate = new Date(e);
      this.minToDate = this.fromDate;
    }

    if(this.isActiveSentBtn) {
      this.getSentOrders();
    }

    if(this.isActiveInboxBtn) {
      this.getInboxOrders();
    }

    if(this.isActiveUnassignedBtn) {
      this.getUnassignedOrders();
    }
  }

  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

  studyNameWithPacsUrl(study: StudyModel) {
    return study.LocalPacsUrl + study.OrgId+study.AccessionNo;
  }

  openStudyDocumentDialog(study: StudyModel) {
    if(study != null) {
      this.studyWorklistData = study;
    }
    this.isVisibleOrderDocumentDialog = true;
  }

  closeOrderdocumentDialog() {
    this.isVisibleOrderDocumentDialog = false;
  }

  onCopy(study: StudyModel) {
    this.url = study.LocalPacsUrl + study.OrgId+study.AccessionNo;
    UtilityService.CopyToClipBoard(this.url);
    this._alertifyService.success('Link Copied');
  }

  copyQRCode(study: StudyModel) {
    this.url = study.LocalPacsUrl + study.OrgId+study.AccessionNo;
    
    QRCode.toDataURL(this.url).then((dataUrl: string) => {
      const blob = this.dataURLToBlob(dataUrl);
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard.write([item]);
      this._alertifyService.success('QR Code Copied');
    }).catch((error: any) => {
      this._alertifyService.error('Error generating QR code');
    });
  }

  private dataURLToBlob(dataUrl: string): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  ngOnDestroy(): void {
    this._orderService.setOrderData([])
  }
}
