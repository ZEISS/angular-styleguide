/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { selectCurrentProductDetails } from '@app/catalog/product/store/product.selectors';
import { ProductDetailComponent } from './product-detail.component';
import { routes } from '@app/app.routes';
import { provideRouter } from '@angular/router';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideRouter(routes),
        provideMockStore({ selectors: [{ selector: selectCurrentProductDetails, value: {} }] }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('increseProductNumber', () => {
    it('should increase product number', () => {
      component.increseProductNumber();

      expect(component.productNumber()).toBe(2);
    });
  });

  describe('decreaseProductNumber', () => {
    it('should decrease product number', () => {
      component.productNumber = signal(2);

      component.decreaseProductNumber();

      expect(component.productNumber()).toBe(1);
    });
  });

  describe('decreaseProductNumberOriginal', () => {
    describe('when decrease called for original value', () => {
      it('should keep original product number', () => {
        component.decreaseProductNumber();

        expect(component.productNumber()).toBe(1);
      });
    });
  });
});
