import { ChangeDetectorRef, Component, computed, inject, Signal } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ShoppingCartStore } from '@app/shared/signal-store/shopping-cart.store';
import { ProductInCart } from '@models/product';
import { FormsModule } from '@angular/forms';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { Store } from '@ngrx/store';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [FaIconComponent, NgIf, NgClass, AsyncPipe, NgFor, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  public faCartShopping: IconDefinition = faCartShopping;
  public isCartContentVisible: boolean;
  public shoppingCartSignalStore = inject(ShoppingCartStore);
  public subTotal: Signal<number> = computed(() => {
    return this.shoppingCartSignalStore
      .products()
      .reduce((accumulator: number, item: ProductInCart) => {
        return accumulator + item.count * Number(item.price);
      }, 0);
  });

  public get products(): ProductInCart[] {
    return this.shoppingCartSignalStore.products();
  }

  // because of open/close animation, we have to distinguish between true,false and undefined values
  public switchCartVisibility(): void {
    if (!this.isCartContentVisible) {
      this.isCartContentVisible = true;
      return;
    }
    this.isCartContentVisible = false;
  }

  public handleCountChange(productId: number, newCount: number): void {
    if (newCount < 1) {
      this.shoppingCartSignalStore.deleteProduct(productId);
      return;
    }

    this.shoppingCartSignalStore.updateCount(productId, newCount);
  }

  public handleBuyButtonClick() {
    const boughtProducts: ProductInCart[] = this.shoppingCartSignalStore.products();

    // it's quite strange to navigate through a store's effect,but this is an old pattern in the codebase
    this.store.dispatch(
      navigate({
        url: '/order',
        navigationExtras: {
          state: {
            products: boughtProducts,
          },
        },
      }),
    );

    this.shoppingCartSignalStore.deleteCartContent();
    this.switchCartVisibility();
  }

  constructor(private store: Store<StateWithCatalog>) {}
}
