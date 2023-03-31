'use strict';

var React = require('react');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

// React Hands
const { createContext, useContext, useReducer, useMemo, useCallback } = React__namespace;
const StoreContext = createContext(undefined);
function reactState(initialState = {}, actions = {}, middlewares = []) {
    function reducer(state, action) {
        const handler = actions[action.type];
        if (handler) {
            return handler(state, action);
        }
        else {
            // handle error then return state as is -- line 1.0
            console.log(`Bad Hands: Your probably passed a different reference to dispatch, "${action.type}" should match the same state name referenced in state!`);
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
        return (React__namespace.createElement(StoreContext.Provider, { value: memorizedValue }, children));
    };
    function useStore() {
        const context = useContext(StoreContext);
        // tell user to wrap their app in store provider
        if (context === undefined) {
            throw new Error('Bad Hands: Your top level component or app must be wrapped within the StoreProvider!');
        }
        const { state, dispatch } = context;
        return [state, dispatch];
    }
    return { StoreProvider, useStore };
}

exports.reactState = reactState;
//# sourceMappingURL=index.js.map
