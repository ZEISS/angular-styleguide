import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { NavigationActions } from '@store/navigation.actions';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    const navigationActionsStub: NavigationActions = new NavigationActions(null);

    TestBed.configureTestingModule({
      declarations: [ ProductComponent ],
      providers: [
        { provide: NavigationActions, useValue: navigationActionsStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
