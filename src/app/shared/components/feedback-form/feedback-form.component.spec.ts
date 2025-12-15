/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormComponent } from './feedback-form.component';
import { FeedbackFormService } from './feedback-form.service';
import { ProductService } from '@app/catalog/product/services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('FeedbackFormComponent', () => {
  let component: FeedbackFormComponent;
  let fixture: ComponentFixture<FeedbackFormComponent>;
  let service: FeedbackFormService;
  let store: MockStore;

  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackFormComponent],
      providers: [
        FeedbackFormService,
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(FeedbackFormService);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values and proper validators', () => {
    expect(component.feedbackForm).toBeDefined();
    expect(component.feedbackForm.get('title')?.value).toBe('');
    expect(component.feedbackForm.get('description')?.value).toBe('');
    expect(component.feedbackForm.get('email')?.value).toBe('');
    expect(component.feedbackForm.get('issueDate')?.value).toBe('');

    // Test form validity
    expect(component.feedbackForm.invalid).toBeTruthy();
  });

  it('should handle form submission with valid data', () => {
    spyOn(service, 'onSubmit');

    // Fill form with valid data
    component.feedbackForm.patchValue({
      title: 'Test Title',
      description: 'Test Description',
      email: 'test@example.com',
      issueDate: '2023-12-01',
    });

    component.onSubmit();

    expect(service.onSubmit).toHaveBeenCalledWith({
      title: 'Test Title',
      description: 'Test Description',
      email: 'test@example.com',
      issueDate: new Date('2023-12-01'),
    });

    expect(component.formSubmittedSuccessfully).toBeTruthy();
  });

  it('should handle invalid form submission', () => {
    spyOn(service, 'onSubmit');
    spyOn(component.feedbackForm, 'markAllAsTouched');

    // Submit invalid form
    component.onSubmit();

    expect(service.onSubmit).not.toHaveBeenCalled();
    expect(component.feedbackForm.markAllAsTouched).toHaveBeenCalledWith();
    expect(component.formSubmittedSuccessfully).toBeFalsy();

    // Test field error detection
    component.feedbackForm.get('title')?.markAsTouched();

    expect(component.hasFieldError('title')).toBeTruthy();
    expect(component.getFieldError('title')).toEqual('This field is required');
  });
});
