/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProductComponent, RecommendationComponent],
  exports: [ProductComponent, RecommendationComponent],
})
export class SharedModule {}
