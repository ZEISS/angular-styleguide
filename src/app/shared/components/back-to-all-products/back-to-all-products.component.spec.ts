/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { BackToAllProductsComponent } from '@app/shared/components/back-to-all-products/back-to-all-products.component';

describe('OrderConfirmationComponent', () => {
  let component: BackToAllProductsComponent;
  let fixture: ComponentFixture<BackToAllProductsComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BackToAllProductsComponent],
      providers: [provideMockStore({ initialState: {} })],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackToAllProductsComponent);
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
