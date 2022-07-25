 import { configureStore} from "@reduxjs/toolkit";
 import { restaurantsApi } from "./restaurantsApi";
 
 export const store = configureStore({
  reducer: {
    [restaurantsApi.reducerPath]: restaurantsApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(restaurantsApi.middleware)
 })