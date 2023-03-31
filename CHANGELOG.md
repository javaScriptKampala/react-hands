# 🧤 React Hands

React's Own Hands Touching State The Easiest Way!

> By Hussein Kizz, Beta Release

## React Hands, 29-Mar-2023 (v1.0.0)

- Added: typescript naming convention, $typeName
- Added: main reactState hook can be called without providing initialState and actions, useful when only interested in dispatch and retrieving state
- Added: Now users will import types from main library itself
- Fix: Store provider has a typescript error!
- Todo: Explore Middleware Concept!
- Todo: Add More Stuff, Persistent State etc

## React Hands, 30-Mar-2023 (v1.0.0)

- Fixed: Store provider has a typescript error!
- Chore: Changed state record type from string and unknown to any!
- Boost: Removed Spread operator in middleware implementation to improve code performance
- Todo: Add better error handler to let user know when action function name differs from dispatched one, at line with flag --line 1.0 in codebase!
- Boost: Used useCallback hook in compose function implementation to improve performance
- Done: Fixed Tsc Errors
- Done: Set development environment for compiling and packaging
- Done: Test package installation and usage locally before publishing to npm!
- Done: published first beta version, via Js Kampala Open Source!

## React Hands, 31-Mar-2023 (v1.0.4)

- Fixing: NPM error on package install!
- Boost: Migrate from tsc to rollup
- Done: Configure And Setup Rollup Bundler
