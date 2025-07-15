import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { OrgSetupComponent } from './components/org-setup/org-setup.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { JobTypeListComponent } from './components/job-type-setup/job-type-list/job-type-list.component';
import { JobTypeLevelComponent } from './components/job-type-setup/job-type-level/job-type-level.component';
import { JobTypePermissionComponent } from './components/job-type-setup/job-type-permission/job-type-permission.component';
import { RadiologistContactComponent } from './components/radiologist-contact/radiologist-contact.component';
import { HospitalContactComponent } from './components/hospital-contact/hospital-contact.component';
import { UserListDocumentComponent } from './components/user-list/user-list-document/user-list-document.component';
import { ExamInfoComponent } from './components/exam-info/exam-info.component';
import { AddUpdateUserComponent } from './components/user-list/add-update-user/add-update-user.component';
import { AddupdateOrginfoComponent } from './components/org-setup/addupdate-orginfo/addupdate-orginfo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddupdateJobtypeComponent } from './components/job-type-setup/job-type-list/addupdate-jobtype/addupdate-jobtype.component';
import { AddupdateJobtypelevelComponent } from './components/job-type-setup/job-type-level/addupdate-jobtypelevel/addupdate-jobtypelevel.component';
import { AddupdateJobtypepermissionComponent } from './components/job-type-setup/job-type-permission/addupdate-jobtypepermission/addupdate-jobtypepermission.component';

@NgModule({
  
  declarations: [
    OrgSetupComponent,
    UserListComponent,
    JobTypeListComponent,
    JobTypeLevelComponent,
    JobTypePermissionComponent,
    RadiologistContactComponent,
    HospitalContactComponent,
    UserListDocumentComponent,
    ExamInfoComponent,
    AddUpdateUserComponent,
    AddupdateOrginfoComponent,
    AddupdateJobtypeComponent,
    AddupdateJobtypelevelComponent,
    AddupdateJobtypepermissionComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule
  ]
})
export class SettingsModule { }
