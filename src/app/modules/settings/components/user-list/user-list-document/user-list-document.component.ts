import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { User } from "src/app/core/models";
import { UserListViewModel } from "src/app/core/models/settings/UserListViewModel";
import { HrEmpdocument } from "src/app/core/models/user-models/HrEmpdocument";
import { OrderDocumentDownloadResModel } from "src/app/core/models/user/order-document-download-res.model";
import { UserService } from "src/app/core/services/settings/user.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-user-list-document",
  templateUrl: "./user-list-document.component.html",
  styleUrls: ["./user-list-document.component.scss"],
})
export class UserListDocumentComponent implements OnInit, OnChanges {
  @Input() userValueSendForChild!: UserListViewModel;
  userId!: number;
  client: User = new User();
  userDocumentList: HrEmpdocument[] = [];
  docSafeURL!: SafeResourceUrl;
  documentURL!: string;
  displayPreviewuserDocumentDialog: boolean = false;
  documentEnvURL = environment.documentEnvURL;
  documentFormatWiseView: any;

  ngOnChanges() {
    if (this.userValueSendForChild != null) {
      this.userId = this.userValueSendForChild.EmpId;
    }

    if (this.userId > 0) {
      this._userService
        .getUserDocumentList(this.userId)
        .subscribe((res: HrEmpdocument[]) => {
          this.userDocumentList = res;
        });
    }
  }

  constructor(
    private _userService: UserService,
    private _domSanitizer: DomSanitizer
  ) {}

  ngOnInit() {}

  downloadUserDocument(empId: number) {
    this._userService
      .downloadUserDocument(empId)
      .subscribe((res: OrderDocumentDownloadResModel) => {
        const downloadLink = document.createElement("a");
        const fileName = res.FileName + res.Extension;
        downloadLink.href =
          "data:application/octet-stream;base64," + res.byteFile;
        downloadLink.download = fileName;
        downloadLink.click();
      });
  }

  previewUserDocument(userDocumentData: HrEmpdocument) {
    this.docSafeURL = "";
    this.documentURL = "null";
    this.documentFormatWiseView = null;

    this.documentURL =
      this.documentEnvURL +
      userDocumentData.EmpId +
      "/" +
      userDocumentData.Type +
      "/" +
      userDocumentData.Title +
      "." +
      userDocumentData.Format;

    this.docSafeURL = this._domSanitizer.bypassSecurityTrustResourceUrl(
      this.documentURL
    );

    if (userDocumentData.Format === "pdf") {
      this.documentFormatWiseView = "pdf";
    } else {
      this.documentFormatWiseView = "img";
    }

    this.displayPreviewuserDocumentDialog = true;
  }
}
