import * as React from 'react';
export type $State = Record<string, any>;
export type $Action = {
    type: string;
    payload?: unknown;
};
export type $Actions = Record<string, (state: $State, action: $Action) => $State>;
export type $Middleware = (store: $Store) => (next: $Dispatch) => $Dispatch;
export type $Store = {
    state: $State;
    dispatch: $Dispatch;
};
export type $Dispatch = (action: $Action) => void;
type StoreType = {
    StoreProvider: React.FC<{
        children: React.ReactNode;
    }>;
    useStore: () => [$State, $Dispatch];
};
export declare function reactState(initialState?: $State, actions?: $Actions, middlewares?: $Middleware[]): StoreType;
export {};
