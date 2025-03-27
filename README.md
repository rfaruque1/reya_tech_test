# React + TypeScript + Vite + Redux

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Running the project

Run npm install on the root directory to install packages. If you do get an error at this stage, you may need to upgrade your version of node via nvm. (Node version 16.0.0 should suffice).

# Project brief overview

The project is split into two parts as alluded to in the test write up. You have the input fields contained in the <Header /> component and the visualisation of the data in the <PositionsViewer /> component. Data comes through two hooks - a useFetch and useWebSocket hook. When the program is initially launched, a call is made to get the market data which is store in redux and then mapped to the users positions data when they enter their wallet address. That position data is then fed into the useWebSocket hook to subscribe to changes in the mark price and updates the redux store accordingly.

The redux store is structured in the following manner:

- the users position data
- the market data which is stripped down to the quoteToken and id

In a real production app, unit and integration tests would be written to ensure code quality and should aim to cover the workings of the feature as well as mitigating against the new code change from having caused an issue in another part of the codebase.

Monitoring strategy would take the form an external monitoring service such as Datadog and Kibana (or perhaps A/B testing systems such as Amplitude) which can alert to any problems with the deployed services.
