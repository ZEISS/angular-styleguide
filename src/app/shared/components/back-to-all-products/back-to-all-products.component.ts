// SPDX-FileCopyrightText: 2023 Carl Zeiss AG
// SPDX-License-Identifier: MIT

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';

@Component({
  selector: 'app-back-to-all-products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FontAwesomeModule],
  templateUrl: './back-to-all-products.component.html',
  styleUrls: ['./back-to-all-products.component.scss'],
})
export class BackToAllProductsComponent {
  faHome = faHome;

  constructor(private store: Store<AppState>) {}

  backToProductOverview(): void {
    this.store.dispatch(navigate({ url: '/' }));
  }
}
