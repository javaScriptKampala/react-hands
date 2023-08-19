// React Hands
// All exportable types have naming convention $TypeName
import * as React from 'react';

const { createContext, useContext, useReducer, useMemo, useCallback } = React;

export type $State = Record<string, any>;
export type $Action = { type: string; payload?: unknown };
export type $Actions = Record<
  string,
  (state: $State, action: $Action) => $State
>;

export type $Middleware = (store: $Store) => (next: $Dispatch) => $Dispatch;
export type $Store = { state: $State; dispatch: $Dispatch };
export type $Dispatch = (action: $Action) => void;

type StoreType = {
  StoreProvider: React.FC<{ children: React.ReactNode }>;
  useStore: () => [$State, $Dispatch];
};

const StoreContext = createContext<$State | undefined>(undefined);

export function reactState(
  initialState: $State = {},
  actions: $Actions = {},
  middlewares: $Middleware[] = []
): StoreType {
  function reducer(state: $State, action: $Action) {
    const handler = actions[action.type];
    if (handler) {
      return handler(state, action);
    } else {
      // handle error then return state as is -- line 1.0
      console.log(
        `Bad Hands: Your probably passed a different reference to dispatch, "${action.type}" should match the same state name referenced in state!`
      );
      return state;
    }
  }

  function applyMiddlewares(
    middlewares: $Middleware[],
    store: $Store
  ): $Dispatch {
    const middlewareAPI = {
      state: store.state,
      dispatch: (action: $Action) => newDispatch(action),
    };
    const functionsChainArray = middlewares.map((middleware) =>
      middleware(middlewareAPI)
    );
    const newDispatch = compose(functionsChainArray)(store.dispatch);
    return newDispatch;
  }

  function compose(funcs: ((arg: any) => any)[]) {
    return useCallback(
      function composed(arg: any) {
        let result = arg;
        for (let i = funcs.length - 1; i >= 0; i--) {
          result = funcs[i](result);
        }
        return result;
      },
      [funcs]
    );
  }

  const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const enhancedDispatch = applyMiddlewares(middlewares, {
      state,
      dispatch,
    });
    const memorizedValue = useMemo(
      () => ({ state, dispatch: enhancedDispatch }),
      [state]
    );

    return (
      <StoreContext.Provider value={memorizedValue}>
        {children}
      </StoreContext.Provider>
    );
  };

  function useStore(): [$State, $Dispatch] {
    const context = useContext<$State | undefined>(StoreContext);

    // tell user to wrap their app in store provider
    if (context === undefined) {
      throw new Error(
        'Bad Hands: Your top level component or app must be wrapped within the StoreProvider!'
      );
    }

    const { state, dispatch } = context;
    return [state as $State, dispatch as $Dispatch];
  }

  return { StoreProvider, useStore };
}
