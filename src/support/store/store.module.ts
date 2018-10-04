import {isDevMode, NgModule} from '@angular/core';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import {deepFreeze} from 'typescript-immutable-helper';
import {RootEpics} from './root.epics';
import {INITIAL_ROOTSTATE, rootReducer, RootState} from './root.reducer';
import {createEpicMiddleware} from 'redux-observable';
import {ProductModule} from '@app/product/product.module';
import {RecommendationsModule} from '@app/product/recommendations/recommendations.module';
import {NgReduxRouter} from '@angular-redux/router';
import {NavigationActions} from './navigation.actions';

@NgModule({
  imports: [
    NgReduxModule,
    ProductModule,
    RecommendationsModule
  ],
  // Root Epics anbieten
  providers: [RootEpics, NavigationActions]
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
      storeEnhancer
    );
    middlewares.run(rootEpics.createEpic());

    ngReduxRouter.initialize();
  }
}
