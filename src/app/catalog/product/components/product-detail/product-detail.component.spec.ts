/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductStore } from '@app/catalog/product/product.store';
import { ShoppingCartStore } from '@app/order/shopping-cart.store';
import { provideHttpClient } from '@angular/common/http';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(waitForAsync(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideHttpClient(),
        ProductStore,
        ShoppingCartStore,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details on init', () => {
    expect(mockActivatedRoute.snapshot.paramMap.get).toHaveBeenCalledWith('id');
  });

  describe('backToProductOverview', () => {
    it('should navigate to root page', () => {
      component.backToProductOverview();

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/');
    });
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
