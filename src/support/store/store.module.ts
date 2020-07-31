import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';

import { metaReducers, reducers } from '@app/reducers';
import { ProductEffects } from '@app/product/product.effects';
import { RecommendationEffects } from '@app/product/recommendations/recommendation.effects';
import { NavigationEffects } from '@app/shared/navigation/navigation.effects';
import { environment } from '@environment';

@NgModule({
  imports: [
    NgRxStoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // TODO Decide whether to import effects module here or in feature modules
    EffectsModule.forRoot([ProductEffects, RecommendationEffects, NavigationEffects]),
  ],
})
export class StoreModule {
}
