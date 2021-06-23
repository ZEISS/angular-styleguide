import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { RecommendationsComponent } from './recommendations.component';
import { loadRecommendations } from '@app/catalog/recommendation/store/recommendation.actions';
import { recommendationFeatureKey } from '@app/catalog/recommendation/store/recommendation.reducer';
import { catalogFeatureKey } from '@app/catalog/store/catalog.reducer';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        provideMockStore({initialState: {[catalogFeatureKey]: {[recommendationFeatureKey]: {}}}})
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadRecommendations action on init', () => {
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(loadRecommendations());
  });
});
