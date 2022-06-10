/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { OrderConfirmationComponent } from './order-confirmation.component';
import { navigate } from '@app/shared/navigation/navigation.actions';

describe('OrderConfirmationComponent', () => {
  let component: OrderConfirmationComponent;
  let fixture: ComponentFixture<OrderConfirmationComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OrderConfirmationComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderConfirmationComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('backToProductOverview', () => {
    it('should dispatch navigate action to root page', () => {
      component.backToProductOverview();

      expect(store.dispatch).toHaveBeenCalledWith(navigate({ url: '/' }));
    });
  });
});
