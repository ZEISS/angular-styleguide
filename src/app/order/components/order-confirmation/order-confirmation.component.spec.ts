/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { OrderConfirmationComponent } from './order-confirmation.component';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl', 'currentNavigation']);
    mockRouter.currentNavigation.and.returnValue(null);

    TestBed.configureTestingModule({
      imports: [OrderConfirmationComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('backToProductOverview', () => {
    it('should navigate to root page', () => {
      component.backToProductOverview();

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
