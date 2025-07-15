import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { BadgeModule } from 'primeng/badge';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeModule } from 'primeng/tree';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';
import { PaginatorModule } from 'primeng/paginator';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { NgOtpInputModule } from "ng-otp-input";
import { MessageModule } from "primeng/message";
import { PopupComponent } from './component/popup/popup.component';
import { DataViewModule } from 'primeng/dataview';


@NgModule({
  declarations: [
    PopupComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    MenuModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule,
    FileUploadModule,
    InputNumberModule,
    DialogModule,
    ToolbarModule,
    RatingModule,
    ToastModule,
    RippleModule,
    TableModule,
    RouterModule,
    CalendarModule,
    ImageModule,
    InputSwitchModule,
    BadgeModule,
    SplitButtonModule,
    FieldsetModule,
    AccordionModule,
    MultiSelectModule,
    TreeModule,
    ProgressSpinnerModule,
    ChartModule,
    PaginatorModule,
    ConfirmDialogModule,
    KeyFilterModule,
    TabViewModule,
    PanelModule,  
    PanelMenuModule,
    CardModule,
    PasswordModule,
    MessagesModule,
    MessageModule,
    NgOtpInputModule
  ],

  exports: [        
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    RadioButtonModule,
    InputNumberModule,
    DropdownModule,
    TableModule,
    FileUploadModule,
    DialogModule,
    ToolbarModule,
    ToastModule,
    RatingModule,
    RippleModule,
    RouterModule,
    AccordionModule,
    FieldsetModule,
    CalendarModule,
    ImageModule,
    InputSwitchModule,
    BadgeModule,
    SplitButtonModule,
    MenuModule,
    MultiSelectModule,
    TreeModule,
    ChartModule,
    PaginatorModule,
    ProgressSpinnerModule,
    TabViewModule,
    KeyFilterModule,
    ConfirmDialogModule,
    PanelMenuModule,
    PanelModule,
    FormsModule,
    CardModule,
    MessageModule,
    PasswordModule,
    MessagesModule,
    NgOtpInputModule,
    PopupComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
