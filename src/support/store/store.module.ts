import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';

import { metaReducers, reducers } from '@app/reducers';
import { NavigationEffects } from '@app/shared/navigation/navigation.effects';
import { environment } from '@environment';

@NgModule({
  imports: [
    NgRxStoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([NavigationEffects]),
  ],
})
export class StoreModule {}
