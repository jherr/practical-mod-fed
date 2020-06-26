import React from "react";
import ReactDOM from "react-dom";
import { createStoreon } from "storeon";
import { useStoreon, StoreContext } from "storeon/react";
import Header from "nav/Header";

import "./index.css";

let countReducer = (store) => {
  store.on("@init", () => ({ count: 0 }));
  store.on("inc", ({ count }) => ({ count: count + 1 }));
  store.on("reset", ({ count }) => ({ count: 0 }));
};

export const store = createStoreon([countReducer]);

const App = () => {
  const { dispatch, count } = useStoreon("count");
  return (
    <div>
      <Header onClear={() => dispatch("reset")} />
      <div>Hi there, I'm some cool product.</div>
      <button onClick={() => dispatch("inc")}>Buy me!</button>
      <div>Cart count is {count}</div>
    </div>
  );
};

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("app")
);
