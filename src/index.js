import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { usersApiSlice } from "./redux/users/usersApiSlice";

store.dispatch(
  usersApiSlice.util.prefetch("getUsers", "UsersList", { force: true })
);
store.dispatch(
  usersApiSlice.util.prefetch("getRestaurants", "RestaurantsList", {
    force: true,
  })
);
store.dispatch(
  usersApiSlice.util.prefetch("getMarkets", "MarketsList", { force: true })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
