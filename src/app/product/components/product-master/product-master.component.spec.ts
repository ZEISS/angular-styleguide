import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { ProductMasterComponent } from './product-master.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductActions } from '@app/product/store/actions';

describe('ProductMasterComponent', () => {
  let component: ProductMasterComponent;
  let fixture: ComponentFixture<ProductMasterComponent>;

  beforeEach(async(() => {
    const productActionsStub: ProductActions = new ProductActions(null);

    TestBed.configureTestingModule({
      declarations: [ProductMasterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ProductActions, useValue: productActionsStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(inject([ProductActions], (productActions: ProductActions) => {
    spyOn(productActions, 'dispatch').and.returnValue({
      startLoadProducts() {}
    } as ProductActions);
    fixture = TestBed.createComponent(ProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
