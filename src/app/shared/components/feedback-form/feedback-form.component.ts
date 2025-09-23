/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { faComment } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  templateUrl: './feedback-form.component.html',
  imports: [FaIconComponent, ThemeSwitcherComponent],
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  constructor() {}

  protected readonly faComment = faComment;
}
