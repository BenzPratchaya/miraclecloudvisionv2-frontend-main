import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyRoutingModule } from './study-routing.module';
import { OrderComponent } from './components/order/order.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { DicomUploadComponent } from './components/dicom-upload/dicom-upload.component';
import { OrderReconcileComponent } from './components/order-reconcile/order-reconcile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderDocumentsComponent } from './components/order-documents/order-documents.component';
import { DataViewModule } from 'primeng/dataview';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DataViewModule,
    StudyRoutingModule,
  ],
  declarations: [
    OrderComponent,
    OrderCardComponent,
    DicomUploadComponent,
    OrderReconcileComponent,
    OrderDocumentsComponent
  ]
})
export class StudyModule { }
