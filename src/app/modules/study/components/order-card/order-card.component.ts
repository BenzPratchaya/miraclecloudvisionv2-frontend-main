import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppUtilities } from 'src/app/core/helpers';
import { MessageConstant, StudyModel, User } from 'src/app/core/models';
import { AlertifyService, OrderService } from 'src/app/core/services';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate('200ms ease-in-out')
      ])
    ]),
    trigger('rotateArrow', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(180deg)'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class OrderCardComponent implements OnInit, OnDestroy {
  @Output("reloadOrderParentFunc")
  reloadOrderParentFunc: EventEmitter<any> =
    new EventEmitter();

  client: User = new User();
  orderData: StudyModel[] = [];

  isCollapsed: boolean[] = [];
  toggleCollapse(index: number): void {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
  
  @Output("isVisibleOrderReconcileDialog")
  isVisibleOrderReconcileDialog: EventEmitter<boolean> = new EventEmitter();

  private _subscription: Subscription;

  constructor(
    private _orderService: OrderService,
    private _alertifyService: AlertifyService,
    private _confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.basicInit();
  }

  private basicInit() {
    this.client = JSON.parse(localStorage.getItem("user") as string);
    this.getOrderData();
  }

  private getOrderData() {
    this._subscription = this._orderService.data$.subscribe(data => {
      this.orderData = data;
    });
  }

  calculateAge(dob: Date) {
    return  AppUtilities.calculateAge(dob);
  }

  orderSubmit(rowData: StudyModel) {

    rowData.TatsetupId = 1;
    rowData.ServiceType = 1;
    rowData.Status = "A";

    rowData.UserId = this.client.EmpId;
    rowData.LastModifiedBy = this.client.EmpId;


    this._confirmationService.confirm({
      key: "submitOrder",
      message: "Do you want to submit this order?",
      accept: () => {
        this._orderService.submitStudy(rowData).subscribe(
          (res: boolean) => {
            if (res) {
              this.reloadOrderParentFunc.emit();
              this._alertifyService.success(MessageConstant.OrderSubmitted);
            } else {
              this._alertifyService.error(MessageConstant.SomethingWrong);
            }
          });
      },
      reject: () => {
        this._alertifyService.info(MessageConstant.DenyAction);
      },
    });
  }

  orderAccept(rowData: StudyModel) {

  }

  openOrderReconcileDialog(rowData: StudyModel) {
    this._orderService.setOrderRowData(rowData);
    this.isVisibleOrderReconcileDialog.emit(true);
  }
  

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
  onCopy(event: ClipboardEvent) {
    // Handle the copy event here
    console.log('Content copied:', event);
  }
}
