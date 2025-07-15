import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReconcileComponent } from './order-reconcile.component';

describe('OrderReconcileComponent', () => {
  let component: OrderReconcileComponent;
  let fixture: ComponentFixture<OrderReconcileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderReconcileComponent]
    });
    fixture = TestBed.createComponent(OrderReconcileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
