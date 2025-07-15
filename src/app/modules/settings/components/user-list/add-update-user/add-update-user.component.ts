import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-add-update-user',
  templateUrl: './add-update-user.component.html',
  styleUrls: ['./add-update-user.component.scss']
})
export class AddUpdateUserComponent implements OnInit{
 
  client: User = new User();
  orgTypeList: any[] | undefined;
  constructor() {
    
  }

  ngOnInit(): void {
    this.loadOrgTypeList();
  }

  loadOrgTypeList() {
    if (this.client.OrgType == "SP") {
      this.orgTypeList = [
        { label: "SP", value: "SP" },
        { label: "Customer", value: "Customer" },
        { label: "Hospital", value: "Hospital" },
        { label: "Viewer", value: "Viewer" },
      ];
    }

    if (this.client.OrgType == "Customer") {
      this.orgTypeList = [
        { label: "Customer", value: "Customer" },
        { label: "Hospital", value: "Hospital" },
        { label: "Viewer", value: "Viewer" },
      ];
    }

    if (this.client.OrgType == "Hospital") {
      this.orgTypeList = [
        { label: "Hospital", value: "Hospital" },
        { label: "Viewer", value: "Viewer" },
      ];
    }

    if (this.client.OrgType == "Viewer") {
      this.orgTypeList = [{ label: "Viewer", value: "Viewer" }];
    }
  }
}
