import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import {UserListViewModel } from 'src/app/core/models/settings/UserListViewModel';
import { UserService } from 'src/app/core/services/settings/user.service';
import { User } from 'src/app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  implements OnInit {

  userList: UserListViewModel[] = [];


  activityValues: number[] = [0, 100];

  loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;

  public newUserForm: FormGroup | undefined;
  saveText:string | undefined ;
  headerText:string ="Add User" ;
  displayAddUserPopUp:boolean=false;

  constructor(private userService:UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUserList();
  }
  
  addNewUser() {
    try {
      // this.newUserForm.reset();
     
      // this.setPatchValueForNewUserForm();
      // this.isVisibleSubspeciality = false;
      // this.isVisibleUserLevel = false;

      this.displayAddUserPopUp = true;
      // this.emailExists = true;
      // this.addUserPopUpHeader = "User Information Entry";
      // this.saveText = "Save";
      // this.initializeUserForm();
    } catch (error) {
      throw error;
    }
  }
  
  closeAddUserModal() {
    this.displayAddUserPopUp = false;
    // this.loadOrganization();
  }
  getUserList(){
    this.userService
      .getUserAfterVerification(1)
      
      .subscribe((data) => {
        if (data) {
          this.userList = data;
          this.loading = false;
        }
      });
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}

}