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

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var createContext = React__namespace.createContext,
  useContext = React__namespace.useContext,
  useReducer = React__namespace.useReducer,
  useMemo = React__namespace.useMemo,
  useCallback = React__namespace.useCallback;
var StoreContext = createContext(undefined);
function reactState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var actions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var middlewares = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  function reducer(state, action) {
    var handler = actions[action.type];
    if (handler) {
      return handler(state, action);
    } else {
      // handle error then return state as is -- line 1.0
      console.log("Bad Hands: Your probably passed a different reference to dispatch, \"".concat(action.type, "\" should match the same state name referenced in state!"));
      return state;
    }
  }
  function applyMiddlewares(middlewares, store) {
    var middlewareAPI = {
      state: store.state,
      dispatch: function dispatch(action) {
        return newDispatch(action);
      }
    };
    var functionsChainArray = middlewares.map(function (middleware) {
      return middleware(middlewareAPI);
    });
    var newDispatch = compose(functionsChainArray)(store.dispatch);
    return newDispatch;
  }
  function compose(funcs) {
    return useCallback(function composed(arg) {
      var result = arg;
      for (var i = funcs.length - 1; i >= 0; i--) {
        result = funcs[i](result);
      }
      return result;
    }, [funcs]);
  }
  var StoreProvider = function StoreProvider(_ref) {
    var children = _ref.children;
    var _useReducer = useReducer(reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];
    var enhancedDispatch = applyMiddlewares(middlewares, {
      state: state,
      dispatch: dispatch
    });
    var memorizedValue = useMemo(function () {
      return {
        state: state,
        dispatch: enhancedDispatch
      };
    }, [state]);
    return React__namespace.createElement(StoreContext.Provider, {
      value: memorizedValue
    }, children);
  };
  function useStore() {
    var context = useContext(StoreContext);
    // tell user to wrap their app in store provider
    if (context === undefined) {
      throw new Error('Bad Hands: Your top level component or app must be wrapped within the StoreProvider!');
    }
    var state = context.state,
      dispatch = context.dispatch;
    return [state, dispatch];
  }
  return {
    StoreProvider: StoreProvider,
    useStore: useStore
  };
}

exports.reactState = reactState;
//# sourceMappingURL=index.js.map
