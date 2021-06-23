import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ProductDetailComponent } from './product-detail.component';
import { productFeatureKey } from '@app/catalog/product/store/product.reducer';
import { catalogFeatureKey } from '@app/catalog/store/catalog.reducer';
import { navigate } from '@app/shared/navigation/navigation.actions';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState: {[catalogFeatureKey]: {[productFeatureKey]: {}}}})
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showConfirmation', () => {
    it('should dispatch navigate action to order page', () => {
      component.showConfirmation();
      expect(store.dispatch).toHaveBeenCalledWith(navigate({url: '/order'}));
    });
  });

  describe('backToProductOverview', () => {
    it('should dispatch navigate action to root page', () => {
      component.backToProductOverview();
      expect(store.dispatch).toHaveBeenCalledWith(navigate({url: '/'}));
    });
  });
});
