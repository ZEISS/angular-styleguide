import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { RecommendationsComponent } from './recommendations.component';
import { loadRecommendations } from '@app/catalog/recommendation/store/recommendation.actions';
import { selectRecommendations } from '@app/catalog/recommendation/store/recommendation.selectors';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let store: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RecommendationsComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          provideMockStore({ selectors: [{ selector: selectRecommendations, value: [] }] }),
        ],
      }).compileComponents();
    })
  );

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
