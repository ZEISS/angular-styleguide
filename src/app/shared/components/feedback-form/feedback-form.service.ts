/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface FeedbackFormData {
  title: string;
  description: string;
  email: string;
  issueDate?: Date;
}

export interface FeedbackFormControls {
  title: FormControl<string>;
  description: FormControl<string>;
  email: FormControl<string>;
  issueDate: FormControl<string>;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackFormService {
  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup<FeedbackFormControls> {
    return this.fb.group({
      title: this.fb.nonNullable.control('', [Validators.required]),
      description: this.fb.nonNullable.control('', [Validators.required]),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      issueDate: this.fb.nonNullable.control(''),
    });
  }

  // Mock API POST request
  onSubmit(formData: FeedbackFormData): void {
    console.log('Feedback form submitted:', formData);
  }
}
