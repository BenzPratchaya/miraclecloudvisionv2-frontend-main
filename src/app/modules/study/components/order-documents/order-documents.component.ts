import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageConstant, OrderDocumentDownloadResModel, OrderDocumentModel, OrderDocumentTypeResModel, StudyModel, User } from 'src/app/core/models';
import { AlertifyService, LocalStorageService, OrderService } from 'src/app/core/services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-documents',
  templateUrl: './order-documents.component.html',
  styleUrls: ['./order-documents.component.scss']
})
export class OrderDocumentsComponent implements OnInit, OnChanges {
  @ViewChild("dt") table: Table;
  @Input() studyWorklistData: StudyModel;
  @Input() isReportDetails: boolean;
  @Input() isBeforeSubmitDocument: boolean;

  documentFile: File;
  documentURL: string;
  loading: boolean = true;
  docSafeURL: SafeResourceUrl;
  documentFormatWiseView: string;
  readonlyDocument: boolean;
  readonlyBeforeSubmitDocument: boolean;
  isStudyStatusFinal: boolean = false;
  documentEnvURL = environment.documentEnvURL;
  displayPreviewOrderDocumentDialog: boolean = false;

  client: User = new User();
  orderDocumentData: OrderDocumentModel[] = [];
  documentTypedDopdownItems: OrderDocumentTypeResModel[] = [];
  orderDocumentRequest: OrderDocumentModel = new OrderDocumentModel();
  orderDocumentDownloadData: OrderDocumentDownloadResModel =
    new OrderDocumentDownloadResModel();

  constructor(
    private _alertify: AlertifyService,
    private _domSanitizer: DomSanitizer,
    private _orderService: OrderService,
    private _confirmationService: ConfirmationService,
  ) {}

  ngOnChanges(): void {
    this.onChangesInitialization();
  }

  ngOnInit(): void {
    this.basicInitialization();
  }

  documentUploader(event): void {
    this.documentFile = event.target.files[0];
    if (this.documentFile) {
      let fileName = this.documentFile.name;
      this.orderDocumentRequest.Title = fileName
        .split(".")
        .slice(0, -1)
        .join(".");

      this.orderDocumentRequest.Format = fileName.split(".").pop();
    } else {
      this._alertify.warning("Please select a file first");
    }
  }

  private uploadDocument(rowData: StudyModel) {
    if (rowData == null) {
      console.log("After hit, then get rowData.");
    } else {
      this.isStudyStatusFinal =
        rowData.Status.toUpperCase() === "F" ? true : false;
      this.orderDocumentRequest.OrgId = rowData.OrgId;
      this.orderDocumentRequest.OrderId = rowData.OrderId;
      this.getUploadedDocumentList(this.orderDocumentRequest.OrderId);
    }
  }

  uploadOrderDocument(myForm: NgForm) {
    debugger;
    const formData = new FormData();
    this.orderDocumentRequest.CreatedBy = this.client.EmpId;
    this.orderDocumentRequest.Type = this.orderDocumentRequest.TypeData.code;
    formData.append(
      "CreatedBy",
      this.orderDocumentRequest.CreatedBy.toString()
    );
    formData.append("OrgId", this.orderDocumentRequest.OrgId.toString());
    formData.append("OrderId", this.orderDocumentRequest.OrderId.toString());
    formData.append("Type", this.orderDocumentRequest.Type);
    formData.append("Title", this.orderDocumentRequest.Title);
    formData.append("Format", this.orderDocumentRequest.Format);
    formData.append("File", this.documentFile);

    this._orderService
      .uploadOrderDocument(formData)
      .subscribe((res: OrderDocumentModel[]) => {
        if (res != null) {
          this._alertify.success(MessageConstant.OrderDocUploadSuccess);
        }
        this.orderDocumentRequest.TypeData = null;
        this.orderDocumentRequest.Title = null;
        this.orderDocumentRequest.File = null;
        this.getUploadedDocumentList(this.orderDocumentRequest.OrderId);
      });
  }

  getUploadedDocumentList(OrderId: number) {
    this._orderService
      .getUploadedDocumentList(OrderId)
      .subscribe((res: OrderDocumentModel[]) => {
        this.orderDocumentData = res;
      });
  }

  previewOrderDocument(orderDocumentData: OrderDocumentModel) {
    this.docSafeURL = null;
    this.documentURL = null;
    this.documentFormatWiseView = null;

    this.documentURL =
      this.documentEnvURL +
      "Study" +
      "/" +
      orderDocumentData.OrderId +
      "/" +
      orderDocumentData.Type +
      "/" +
      orderDocumentData.Title +
      "." +
      orderDocumentData.Format;

    this.docSafeURL = this._domSanitizer.bypassSecurityTrustResourceUrl(
      this.documentURL
    );

    if (orderDocumentData.Format === "pdf") {
      this.documentFormatWiseView = "pdf";
    } else {
      this.documentFormatWiseView = "img";
    }

    this.displayPreviewOrderDocumentDialog = true;
  }

  downloadOrderDocument(OrderDocumentId: number) {
    this._orderService
      .downloadOrderDocument(OrderDocumentId)
      .subscribe((res: OrderDocumentDownloadResModel) => {
        const downloadLink = document.createElement("a");
        const fileName = res.FileName + res.Extension;
        downloadLink.href =
          "data:application/octet-stream;base64," + res.byteFile;
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  deleteOrderDocument(OrderDocumentId: number) {
    this._confirmationService.confirm({
      key: "deleteOrderDocument",
      message: "Are you sure to remove this document?",
      accept: () => {
        this._orderService
          .deleteOrderDocument(OrderDocumentId)
          .subscribe((res: boolean) => {
            if (res) {
              this.getUploadedDocumentList(this.orderDocumentRequest.OrderId);
              this._alertify.success(MessageConstant.OrderDocDeleteSuccess);
            } else {
              this._alertify.warning(MessageConstant.SomethingWrong);
            }
          });
      },
      reject: () => {
        this._alertify.success(MessageConstant.DenyAction);
      },
    });
  }

  private basicInitialization() {
    this.client = LocalStorageService.getUserStorageValue();
    this.loading = false;
    this.documentTypedDopdownItems = [
      { name: "Report", code: "R" },
      { name: "Lab data", code: "L" },
      { name: "Clinical diagnosis", code: "C" },
    ];
  }

  private onChangesInitialization() {
    if (this.studyWorklistData != null) {
      this.uploadDocument(this.studyWorklistData);
    }
    this.readonlyDocument = this.isReportDetails ? true : false;
    this.readonlyBeforeSubmitDocument = this.isBeforeSubmitDocument
      ? true
      : false;
  }
}

