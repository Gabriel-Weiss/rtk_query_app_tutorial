import "./index.css";
import App from "./App";
import React from "react";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { usersApiSlice } from "./redux/users/usersApiSlice";
import { PersistGate } from "redux-persist/integration/react";
import { getCartQuantity, getCartSum } from "./redux/cart/cartSlice";

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
store.dispatch(getCartQuantity());
store.dispatch(getCartSum());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
