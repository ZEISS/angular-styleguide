/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  declarations: [ProductComponent, RecommendationComponent, ThemeSwitcherComponent],
  exports: [ProductComponent, RecommendationComponent, ThemeSwitcherComponent],
})
export class SharedModule {}
