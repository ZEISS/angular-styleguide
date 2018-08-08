import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationInfoComponent } from './confirmation-info.component';

describe('ConfirmationInfoComponent', () => {
  let component: ConfirmationInfoComponent;
  let fixture: ComponentFixture<ConfirmationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
