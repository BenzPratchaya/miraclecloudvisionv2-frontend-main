import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GblEnvViewModel, GeneralResModel, MessageConstant, OrderDocumentModel, SiteInformationModel, User } from 'src/app/core/models';
import { SiteInformation } from 'src/app/core/models/settings/site-information';
import { AlertifyService, DicomService, LocalStorageService, OrgService, SiteService } from 'src/app/core/services';

@Component({
  selector: 'app-dicom-upload',
  templateUrl: './dicom-upload.component.html',
  styleUrls: ['./dicom-upload.component.scss']
})
export class DicomUploadComponent implements OnInit {
  @Output("reloadOrderParentFunc")
  reloadOrderParentFunc: EventEmitter<any> =
    new EventEmitter();
  
  @Output("isVisibleDicomUploadDialog")
  isVisibleDicomUploadDialog: EventEmitter<boolean> = new EventEmitter();

  orgId?: number = 0;
  client: User = new User();
  selectedSite: SiteInformationModel;
  siteList: SiteInformationModel[] = [];
  myFiles: File[] = [];
  filesToUpload: Array<File> = [];
  myDrectoryFiles: File[] = [];
  folderFilesToUpload: Array<File> = [];
  isLoaderVisible: boolean = false;
  fileOrFolderSwitch: boolean = false;
  totalSize: number = 0;
  orderDocumentRequest: OrderDocumentModel = new OrderDocumentModel();

  constructor(
    private _siteService: SiteService,
    private _dicomService: DicomService,
    private _alertifyService: AlertifyService,
  ) {}

  ngOnInit(): void {
    this.basicInit();
  }

  private basicInit() {
    this.client = LocalStorageService.getUserStorageValue();
    if(this.client.OrgId > 0) {
      this.getHospitalListByOrgId(this.client.OrgId, "Referring");
    }
  }


  private getHospitalListByOrgId(orgId: number, type: string) {
    this._siteService.getHospitalListByOrgId(orgId, type).subscribe((res: SiteInformationModel[]) => {
      if(res.length > 0) {
        this.siteList = res;
        this.selectedSite = this.siteList?.[0];
      }
    });
  }

  // Select files
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        this.myFiles.push(file);
        this.filesToUpload.push(file);
      }
    } else {
      this._alertifyService.warning(MessageConstant.SelectFileFirst);
    }
  }

  deleteFiles(index: number) {
    this.filesToUpload.splice(index, 1);
    this.myFiles.splice(index, 1);
  }

  cancelFiles() {
    this.filesToUpload = [];
    this.myFiles = [];
  }

  // API call for uploading DICOM
  onUploadFiles() {
    this.isLoaderVisible = true;
    let formData = new FormData();
    this.myFiles.forEach((file) => {
      if(this.selectedSite?.OrgId) { 
        formData.append("OrgIdreferto", this.selectedSite.OrgId.toString());
      } 
      
      // else {
      //   this._alertifyService.error("Refer to Id Must be select!");
      //   return
      // }

      formData.append("OrgId", this.client.OrgId.toString());
      formData.append("CreatedBy", this.client.EmpId.toString());
      formData.append("Files", file);
    });

    this._dicomService.uploadDicomfiles(formData).subscribe((res: any) => {
      if (res != null && res == true) {
        this.cancelFiles();
        formData = new FormData();
        this.isLoaderVisible = false;
        this.reloadOrderParentFunc.emit();
        this.isVisibleDicomUploadDialog.emit(true);
        this._alertifyService.success(MessageConstant.UploadSuccess);
      } else {
        this.isLoaderVisible = false;
        this._alertifyService.error(MessageConstant.UploadFailed);
      }
      this.isLoaderVisible = false;
    });
  }

  onFolderSelected(event: any) {
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        this.myDrectoryFiles.push(file);
        this.folderFilesToUpload.push(file);
      }
    } else {
      this._alertifyService.error(MessageConstant.SelectFolderFirst);
    }
  }

  deleteFolderFile(index: number) {
    this.folderFilesToUpload.splice(index, 1);
    this.myDrectoryFiles.splice(index, 1);
  }

  cancelFolderFile() {
    this.folderFilesToUpload = [];
    this.myDrectoryFiles = [];
  }

  onDirectoryUploadFiles() {
    if (this.myDrectoryFiles == null) return;
    this.isLoaderVisible = true;
    let formData = new FormData();
    this.myDrectoryFiles.forEach((file) => {
      if(this.selectedSite?.OrgId) {
        formData.append("OrgIdreferto", this.selectedSite.OrgId.toString());
      }
      formData.append("OrgId", this.client.OrgId.toString());
      formData.append("CreatedBy", this.client.EmpId.toString());
      formData.append("Files", file);
    });

    this._dicomService.uploadDicomfiles(formData).subscribe((res: any) => {
      if (res != null && res == true) {
        this.cancelFolderFile();
        formData = new FormData();
        this.isLoaderVisible = false;
        this.reloadOrderParentFunc.emit();
        this.isVisibleDicomUploadDialog.emit(true);
        this._alertifyService.success(MessageConstant.UploadSuccess);
      } else {
        this.isLoaderVisible = false;
        this._alertifyService.error(MessageConstant.UploadFailed);
      }
      this.isLoaderVisible = false;
    });
  }

  handleSwitchChange(event: any) {
    if (event != null) {
      this.cancelFiles();
      this.cancelFolderFile();
    }
  }
}
