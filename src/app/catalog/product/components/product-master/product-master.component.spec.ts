/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CUSTOM_ELEMENTS_SCHEMA, signal, Signal } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductMasterComponent } from './product-master.component';
import { ProductStore } from '@app/catalog/product/product.store';
import { Product } from '@models/product';
import { provideHttpClient } from '@angular/common/http';

describe('ProductMasterComponent', () => {
  let component: ProductMasterComponent;
  let fixture: ComponentFixture<ProductMasterComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let productsSignal: Signal<Product[]>;

  beforeEach(waitForAsync(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    productsSignal = signal<Product[]>([]);

    TestBed.configureTestingModule({
      imports: [ProductMasterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Router, useValue: mockRouter }, provideHttpClient(), ProductStore],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadProductDetails', () => {
    it('should navigate to product detail page', () => {
      component.loadProductDetails(42);

      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/product/42');
    });
  });

  describe('isContentInTheViewport', () => {
    it('should return false for index when no products loaded', () => {
      // When no products are loaded, the array is empty, so accessing index returns undefined
      expect(component.isContentInTheViewport(0)).toBeUndefined();
    });
  });
});
