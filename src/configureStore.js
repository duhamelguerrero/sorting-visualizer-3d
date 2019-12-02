import React from "react";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers/main.reducer";
import thunk from "redux-thunk";
import { connect } from "react-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    reducer,
    /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)) // thunk required for async action creators
  );

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./reducers/main.reducer", () =>
      store.replaceReducer(reducer)
    );
  }

  return store;
};

export default configureStore;
