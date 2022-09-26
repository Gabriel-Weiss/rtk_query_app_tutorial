import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { apiSlice } from "./redux/apiSlice";
import authReducer from "./redux/auth/authSlice";
import { BrowserRouter } from "react-router-dom";

import "@testing-library/jest-dom";

const mockStore = {
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer, auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
};

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore(mockStore, { preloadedState }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
