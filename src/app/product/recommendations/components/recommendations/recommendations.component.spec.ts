import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecommendationActions } from '@app/product/recommendations/store/actions';
import { RecommendationsComponent } from './recommendations.component';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;

  beforeEach(async(() => {
    const recommendationActionsStub: RecommendationActions = new RecommendationActions(null);

    TestBed.configureTestingModule({
      declarations: [RecommendationsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RecommendationActions, useValue: recommendationActionsStub },
      ],
    })
      .compileComponents();
  }));

  beforeEach(inject([RecommendationActions], (recommendationActions: RecommendationActions) => {
    spyOn(recommendationActions, 'dispatch').and.returnValue({
      startLoadRecommendations() {},
    } as RecommendationActions);
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
