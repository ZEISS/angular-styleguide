import { NgRedux } from '@angular-redux/store';

export interface EmptyAction<S extends string> {
  type: S;
  error?: boolean;
}

export interface PayloadAction<S extends string, P> extends EmptyAction<S> {
  payload: P;
}

export interface MetaAction<S extends string, M> extends EmptyAction<S> {
  meta: M;
}

export interface PayloadMetaAction<S extends string, P, M> extends PayloadAction<S, P>, MetaAction<S, M> {
}

export type Action<S extends string, P = never, M = never> =
  EmptyAction<S>
  | PayloadAction<S, P>
  | MetaAction<S, M>
  | PayloadMetaAction<S, P, M>;

const DISPATCHABLE_KEY = Symbol('reflect:dispatchable');

export function Dispatchable(): MethodDecorator {
  return function dispatchableDecorator(target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.set(descriptor.value, DISPATCHABLE_KEY, true);
  };
}

export abstract class ActionCreator<A, S> {
  protected abstract ngRedux: NgRedux<S>;

  dispatch(): A {
    const methods =
      (Object.getOwnPropertyNames(this) as (string | symbol)[])
        .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
        .concat(Object.getOwnPropertySymbols(this))
        .concat(Object.getOwnPropertySymbols(Object.getPrototypeOf(this)))
        .filter(key => Reflect.has(this[key], DISPATCHABLE_KEY));

    return methods.reduce((dispatcher, creator) =>
      Object.assign({},
        dispatcher,
        { [creator]: (...args) => this.ngRedux.dispatch(this[creator](...args)) }), {} as A);
  }
}
