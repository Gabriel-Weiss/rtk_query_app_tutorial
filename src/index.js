import "./index.css";
import App from "./App";
import React from "react";
import Box from "@mui/material/Box";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import store, { persistor } from "./redux/store";
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
        <Box display="flex" flexDirection={"column"}>
          <App />
        </Box>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
