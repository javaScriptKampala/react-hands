"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactState = void 0;
// React State
// All exportable tpypes have naming convention $typeName
const React = __importStar(require("react"));
const { createContext, useContext, useReducer, useMemo, useCallback } = React;
const StoreContext = createContext(undefined);
function reactState(initialState = {}, actions = {}, middlewares = []) {
    function reducer(state, action) {
        const handler = actions[action.type];
        if (handler) {
            return handler(state, action);
        }
        else {
            // handle error then return state as is -- line 1.0
            console.log(`React State: Your probably passed a different reference to dispatch, "${action.type}" should match the same state name referenced in state!`);
            return state;
        }
    }
    function applyMiddlewares(middlewares, store) {
        const middlewareAPI = {
            state: store.state,
            dispatch: (action) => newDispatch(action),
        };
        const functionsChainArray = middlewares.map((middleware) => middleware(middlewareAPI));
        const newDispatch = compose(functionsChainArray)(store.dispatch);
        return newDispatch;
    }
    function compose(funcs) {
        return useCallback(function composed(arg) {
            let result = arg;
            for (let i = funcs.length - 1; i >= 0; i--) {
                result = funcs[i](result);
            }
            return result;
        }, [funcs]);
    }
    const StoreProvider = ({ children, }) => {
        const [state, dispatch] = useReducer(reducer, initialState);
        const enhancedDispatch = applyMiddlewares(middlewares, {
            state,
            dispatch,
        });
        const memorizedValue = useMemo(() => ({ state, dispatch: enhancedDispatch }), [state]);
        return (React.createElement(StoreContext.Provider, { value: memorizedValue }, children));
    };
    function useStore() {
        const context = useContext(StoreContext);
        // tell user to wrap their app in store provider
        if (context === undefined) {
            throw new Error('React State: Your top level component or app must be wrapped within the StoreProvider!');
        }
        const { state, dispatch } = context;
        return [state, dispatch];
    }
    return { StoreProvider, useStore };
}
exports.reactState = reactState;
//# sourceMappingURL=index.js.map