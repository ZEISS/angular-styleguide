import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderConfirmationComponent } from './order-confirmation.component';
import { NavigationActions } from '@store/navigation.actions';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;

  beforeEach(async(() => {
    const navigationActionsStub: NavigationActions = new NavigationActions(null);

    TestBed.configureTestingModule({
      declarations: [OrderConfirmationComponent],
      providers: [
        { provide: NavigationActions, useValue: navigationActionsStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
