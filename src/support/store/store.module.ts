import { NgReduxRouter } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { isDevMode, NgModule } from '@angular/core';
import { ProductModule } from '@app/product/product.module';
import { RecommendationsModule } from '@app/product/recommendations/recommendations.module';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { deepFreeze } from 'typescript-immutable-helper';
import { NavigationActions } from './navigation.actions';
import { RootEpics } from './root.epics';
import { INITIAL_ROOTSTATE, rootReducer, RootState } from './root.reducer';
import { metaReducers, reducers } from '@app/reducers';
import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@environment';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '@app/product/product.effects';
import { NavigationEffects } from '@app/shared/navigation/navigation.effects';

@NgModule({
  imports: [
    NgReduxModule,
    ProductModule,
    RecommendationsModule,
    NgRxStoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ProductEffects, NavigationEffects]),
  ],
  // Root Epics anbieten
  providers: [RootEpics, NavigationActions],
})
export class StoreModule {
  // Injektion der DevTool und der Root Epics
  constructor(store: NgRedux<RootState>, ngReduxRouter: NgReduxRouter, devTools: DevToolsExtension, rootEpics: RootEpics) {
    // Definition der Middlewares
    const middlewares = createEpicMiddleware();
    // Definition der Store-Enhancer
    const storeEnhancer = devTools.isEnabled() ? [devTools.enhancer()] : [];
    // Unveränderlichkeit des States mittels deepFreeze (typescript-immutable-helper) sicherstellen
    const rootState = isDevMode() ? deepFreeze(INITIAL_ROOTSTATE) : INITIAL_ROOTSTATE;

    // Alles in die Store Konfiguration einbinden
    store.configureStore(
      rootReducer,
      rootState,
      [middlewares],
      storeEnhancer,
    );
    middlewares.run(rootEpics.createEpic());

    ngReduxRouter.initialize();
  }
}
