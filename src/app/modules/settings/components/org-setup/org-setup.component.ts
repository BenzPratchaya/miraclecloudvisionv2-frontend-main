import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { User } from 'src/app/core/models';
import { Gblenv } from 'src/app/core/models/settings/orginfos/gblenv.model';
import { GblAddress } from 'src/app/core/models/settings/radiologist-signup/GblAddress';
import { GblCountry } from 'src/app/core/models/settings/radiologist-signup/GblCountry';
import { LocalStorageService } from 'src/app/core/services';
import { OrgService } from 'src/app/core/services/settings/org.service';
import { UserService } from 'src/app/core/services/settings/user.service';

@Component({
  selector: 'app-org-setup',
  templateUrl: './org-setup.component.html',
  styleUrls: ['./org-setup.component.scss']
})
export class OrgSetupComponent implements OnInit {

  orgInfoes: Gblenv[] = [];


  public btnLabel: string = "Save";
  activityValues: number[] = [0, 100];
  public inputOrgid: number = 0;
  public addUpdateOrgPopUpHeader = "Add Organization Information";
  loading: boolean = true;
  loaderVisible: boolean = false;
  public approvebtn: boolean = false;
  @ViewChild('filter') filter!: ElementRef;

  countryList: GblCountry[];
  gblAddress: GblAddress = new GblAddress();
  public displayAddUpdateOrgPopUp = false;
  client: User = new User();
  constructor(private orgService:OrgService, private _userService: UserService) 
  { }

  ngOnInit() {
    this.basicInitialization();
    
  }

  private basicInitialization() {
    this.client = LocalStorageService.getUserStorageValue();
    this.getOrgInfoList();
    this.loadAddressList();
  }
  reload(check) {
    if (check) {
      this.getOrgInfoList();
      this.displayAddUpdateOrgPopUp = false;
      this.approvebtn = false;
    }
  }

  private loadAddressList() {
    this.countryList = [];
    this._userService.getAddressList().subscribe((data) => {
      if (data.IsSucceed) {
        this.gblAddress = data.Result as GblAddress;
        this.countryList = this.gblAddress.CountryList;
      }
    });
  }
  addUpdateOrg(orgId: number) {
    try {
      this.displayAddUpdateOrgPopUp = true;
      this.loaderVisible = false;
      if (orgId > 0) {
        this.btnLabel = "Update";
        this.addUpdateOrgPopUpHeader = "Update Organization Information";
      } else {
        this.btnLabel = "Save";
        this.addUpdateOrgPopUpHeader = "Add Organization Information";
      }
      this.inputOrgid = orgId;
    } catch (error) {
      throw error;
    }
  }
  approveOrg(orgId: number) {
    try {
      this.displayAddUpdateOrgPopUp = true;
      this.approvebtn = true;
      this.btnLabel = "Update";

      if (orgId > 0) {
        this.addUpdateOrgPopUpHeader = "Approve Organization Information";
      } else {
        this.addUpdateOrgPopUpHeader = "Add Organization Information";
      }
      this.inputOrgid = orgId;
      //Reactive Form Controls
      // this.initializeUserForm();
    } catch (error) {
      throw error;
    }
  }
  close() {
    this.orgService.changeindexEvent(0);
  }
  getOrgInfoList(){

    this.orgService.getOrgInfoes().subscribe(data=>{
      if(data.IsSucceed){
        // console.log(data.Result);
        this.orgInfoes =  data.Result as Gblenv[];
        if (this.client.OrgType=='Hospital') {
          this.orgInfoes = this.orgInfoes.filter(e=>e.OrgId== this.client.OrgId);
        }
        this.loading = false;
      }
    })

  }


  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  
}
