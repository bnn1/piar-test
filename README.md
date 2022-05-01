## Test application for Piar

#### Running the application

1. Clone repository `git clone git@github.com:bnn1/piar-test.git`
1. Cd into cloned repository `cd pira-test`
1. Run dev server `yarn dev`
1. Build production app `yarn build`
1. Run production app `yarn start`

##### [Live version](https://piar-test.vercel.app/login)
#### Stack used

- next.js
- typescript
- eslint
- material-ui
- next-auth
- zustand

Todo: 

- better typing
- better performance (for example eliminate o^2 complexity from table component)
- polymorphic form component - currently only works with direct input childs
- test suits 
- general refactoring