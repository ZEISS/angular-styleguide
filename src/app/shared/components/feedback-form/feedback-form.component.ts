/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { BackToAllProductsComponent } from '@app/shared/components/back-to-all-products/back-to-all-products.component';
import {
  FeedbackFormService,
  FeedbackFormData,
  FeedbackFormControls,
} from './feedback-form.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  templateUrl: './feedback-form.component.html',
  imports: [ThemeSwitcherComponent, BackToAllProductsComponent, ReactiveFormsModule],
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm!: FormGroup<FeedbackFormControls>;

  constructor(private feedbackFormService: FeedbackFormService) {}

  ngOnInit(): void {
    this.feedbackForm = this.feedbackFormService.createForm();
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      const formValue = this.feedbackForm.getRawValue();

      const formData: FeedbackFormData = {
        title: formValue.title,
        description: formValue.description,
        email: formValue.email,
        issueDate: formValue.issueDate ? new Date(formValue.issueDate) : undefined,
      };

      this.feedbackFormService.onSubmit(formData);
    } else {
      this.feedbackForm.markAllAsTouched();
    }
  }

  hasFieldError(fieldName: keyof FeedbackFormControls): boolean {
    const field = this.feedbackForm.get(fieldName);
    return !!(field?.invalid && (field?.dirty || field?.touched));
  }

  getFieldError(fieldName: keyof FeedbackFormControls): string {
    const field = this.feedbackForm.get(fieldName);

    if (!field?.errors) {
      return '';
    }

    if (field.hasError('required')) {
      return 'This field is required';
    }

    if (field.hasError('email')) {
      return 'Please enter a valid email address';
    }

    return '';
  }
}
