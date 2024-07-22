/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { loadProducts } from '@app/catalog/product/store/product.actions';
import { selectProducts } from '@app/catalog/product/store/product.selectors';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { ViewportService } from '@app/catalog/recommendation/services/viewport.service';
import { ProductComponent } from '@app/shared/components/product/product.component';
import { Product } from '@models/product';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-product-master',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss'],
})
export class ProductMasterComponent implements OnInit, AfterViewInit {
  public products: Product[];
  private displayableContentSections: boolean[];

  @ViewChildren(ProductComponent) productChildren: QueryList<ProductComponent>;

  private productReceiveHandler = (products: Product[]) => {
    // fill the sections - if product.length is 8 -> there are 3 sections. One section contains 3 product
    this.displayableContentSections = new Array(Math.round(products.length / 3)).fill(false);
    this.products = products;
    this.cdr.markForCheck();
  };

  constructor(
    private store: Store<StateWithCatalog>,
    private viewportService: ViewportService,
    private cdr: ChangeDetectorRef,
  ) {
    this.store.select(selectProducts).subscribe(this.productReceiveHandler);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  loadProductDetails(id: number) {
    this.store.dispatch(navigate({ url: `/product/${id}` }));
  }

  public isContentInTheViewport2(index: number): boolean {
    return this.displayableContentSections[index / 3];
  }

  ngAfterViewInit(): void {
    // the subscription must be delayed a little,
    // because if we subscribe immediately, the function may run in the middle of the rendering and indicate that element is in the viewport
    // and is not working properly.
    this.productChildren.changes.pipe(debounceTime(10)).subscribe(() => {
      const renderedSections: number = this.productChildren.length / 3;
      const lastRenderedSection: number =
        renderedSections % 3 === 0 ? renderedSections : Math.floor(renderedSections);
      this.viewportService
        .isInViewport(this.productChildren?.last?.elementRef)
        .subscribe((isInViewport: boolean) => {
          if (isInViewport) {
            this.displayableContentSections[lastRenderedSection + 1] = true;
          }
          this.cdr.markForCheck();
        });
    });
  }
}
