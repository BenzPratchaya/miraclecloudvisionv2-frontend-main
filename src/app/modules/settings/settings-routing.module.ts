import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgSetupComponent } from './components/org-setup/org-setup.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { JobTypeListComponent } from './components/job-type-setup/job-type-list/job-type-list.component';
import { JobTypeLevelComponent } from './components/job-type-setup/job-type-level/job-type-level.component';
import { JobTypePermissionComponent } from './components/job-type-setup/job-type-permission/job-type-permission.component';
import { RadiologistContactComponent } from './components/radiologist-contact/radiologist-contact.component';
import { HospitalContactComponent } from './components/hospital-contact/hospital-contact.component';
import { ExamInfoComponent } from './components/exam-info/exam-info.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  { path: 'org-list', data: { breadcrumb: 'Organization List' }, component: OrgSetupComponent,canActivate:[AuthGuard] },
  { path: 'user-list', data: { breadcrumb: 'User List' },component: UserListComponent,canActivate:[AuthGuard] },
  { path: 'radiologist-contract',  data: { breadcrumb: 'Radiologist Contract' },component: RadiologistContactComponent,canActivate:[AuthGuard] },
  { path: 'hospital-contract', data: { breadcrumb: 'Hospital Contract' },component: HospitalContactComponent,canActivate:[AuthGuard] },
  { path: 'exam-info', data: { breadcrumb: 'Exam Information' },component: ExamInfoComponent,canActivate:[AuthGuard] },
  { path: 'job-type-list',data: { breadcrumb: 'Job Type' }, component: JobTypeListComponent,canActivate:[AuthGuard] },
  { path: 'job-type-level',data: { breadcrumb: 'Job Type Level' },  component: JobTypeLevelComponent,canActivate:[AuthGuard] },
  { path: 'job-type-permission',data: { breadcrumb: 'Job Type Permission' },  component: JobTypePermissionComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
