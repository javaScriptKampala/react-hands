# 🧤 React Hands

> By Hussein Kizz, First Beta Release v1.0.0

React's Own Hands Touching State The Easiest Way!

Unlike others, react hands focuses on easiness and takes a shorthand approach to managing state in your react applications by using react's built in hooks mainly useContext and useReducer which are pretty handy by the way, and also emphasize a single source of truth or global state philosophy to allow managing state at scale a breeze, though local state approach is also supported intuitively. And with that said, `react-hands` is a lightweight, simple and easiest to use state management library to help you manage your application's state without having to learn that much anything new, as the library provides a `StoreProvider` wrapper component and a `useStore` hook for accessing and updating the state just as you would almost do it with react itself, resulting into a simillar and easy to use state management pattern.

## Installation

You can install the `react-hands` library using npm or yarn:

```bash
npm install react-hands
# or
yarn add react-hands
```

## Usage

### Creating the Store

To create the store, use the `reactState` function. It takes three arguments:

1. `initialState`: an object representing the initial state of your application's state.
2. `actions`: an object containing functions that update the state in response to dispatched actions.
3. `middlewares` (optional): an array of middleware functions that modifies the dispatch behavior.

> 💡Middlewares basically help you mutate state with a custom fucntion or an array of functions in given order, before the dispatched action takes place, this will be available in next release.

Meanwhile here is how to create a store:

``` jsx
// App.jsx

import { reactState } from "react-hands";

const initialState = { count: 0 };

const actions = {
  increment: (state, action) => ({ count: state.count + 1 }),
  decrement: (state, action) => ({ count: state.count - 1 }),
};

```

### Providing the Store

Wrap your top-level component, app or layout with the `StoreProvider` component to provide the store to your app and to all it's child components.

```jsx
// App.jsx

const { StoreProvider } = reactState(initialState, actions);

function App() {
  return (
    <StoreProvider>
      <MyComponent />
    </StoreProvider>
  );
}
```

### Accessing the State

To access the state in your components, use the `useStore` hook. It returns an array with the current state and the dispatch function, simillar to useState hook in react!

```jsx
// MyComponent.jsx

import { reactState } from "react-hands";

const { useStore } = reactState();

function MyComponent() {
  const [state, dispatch] = useStore();

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

💡 Notice: The dispatch type such as `increment` should match the same state name in store such as `increment`  exactly, otherwise react hands will blow an error in console, so watchout and let's continue!

### Updating the State

To update the state, dispatch an action to the store. The action is an object with a `type` property that corresponds to one of the functions in the `actions` object. For example here both the increment and decrement actions increase and decrease the count in store respectively!

```jsx
const actions = {
  increment: (state, action) => ({ count: state.count + 1 }),
  decrement: (state, action) => ({ count: state.count - 1 }),
};

// dispatching action...
dispatch({ type: "increment" });
```

### Handling Errors

If an action with an unrecognized type is dispatched, `react hands` will log some error to the console and return the current state as is. The error message will usually be reminding you to use the same name as the state in your dispatch action. And more error handlers are being worked on!

### 🔥 Bonus

Did you know, react-hands supports typescript out of the box, it also provides types for state and dispatch, you just have to import a type like `$typeName` from react hands like this for example:

```jsx
// MyApp.tsx

import { $Action, $State, reactState } from "react-hands";

export default function MyApp() {
  const initialState = {
    isDarkMode: false,
    count: 0,
  };

  const actions = {
    toggleDarkMode: (state: $State) => ({
      ...state,
      isDarkMode: !state.isDarkMode,
    }),
    increment: (state: $State) => ({
      ...state,
      count: state.count + 1,
    }),
    decrement: (state: $State) => ({
      ...state,
      count: state.count - 1,
    }),
  };

  const { StoreProvider } = reactState(initialState, actions);

  return (
      <StoreProvider>
          <MyComponent/>
      </StoreProvider>
  );
}

```

## Conclusion

The `react-hands` library provides a simple way to manage state in your React applications. It's easy to use, and its lightweight nature makes it a great option for react projects small or complex. It's still work in progress, therefore contributions are welcomed, we will be updating this documentation to explore other patterns such as adding items to store from any component other than main or top level component, persisting state depsite page reloads etc.

😇 Pro Tip: If it works don't tocuh it, or break that comfort zone and give this a try!!!
