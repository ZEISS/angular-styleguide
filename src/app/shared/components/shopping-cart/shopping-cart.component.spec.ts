/*
 * SPDX-FileCopyrightText: (c) $originalComment.match("Copyright \(c\) (\d+)", 1, "-", "$today.year")2024 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartComponent],
      providers: [provideMockStore({ initialState: {} })],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
