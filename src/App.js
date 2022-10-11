import "./App.css";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./features/auth/Login";
import NotFound from "./components/NotFound";
import PersistAuth from "./features/auth/PersistAuth";
import RequireAuth from "./features/auth/RequireAuth";
import RegisterUser from "./features/users/RegisterUser";
import MarketsGrid from "./features/markets/MarketsGrid";
import MarketDetails from "./features/markets/MarketDetails";
import AddMarketForm from "./features/markets/AddMarketForm";
import EditMarketForm from "./features/markets/EditMarketForm";
import RestaurantsGrid from "./features/restaurants/RestaurantsGrid";
import RestaurantDetails from "./features/restaurants/RestaurantDetails";
import AddRestaurantForm from "./features/restaurants/AddRestaurantForm";
import EditRestaurantForm from "./features/restaurants/EditRestaurantForm";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route element={<PersistAuth />}>
          <Route path="markets" element={<Markets />}>
            <Route index element={<MarketsGrid />} />
            <Route path=":id" element={<MarketDetails />} />
            <Route element={<RequireAuth />}>
              <Route path="add" element={<AddMarketForm />} />
              <Route path="edit/:id" element={<EditMarketForm />} />
            </Route>
            {/*End of RequireAuth*/}
          </Route>
          {/*End of Markets*/}
          <Route path="restaurants" element={<Restaurants />}>
            <Route index element={<RestaurantsGrid />} />
            <Route path=":id" element={<RestaurantDetails />} />
            <Route element={<RequireAuth />}>
              <Route path="add" element={<AddRestaurantForm />} />
              <Route path="edit/:id" element={<EditRestaurantForm />} />
            </Route>
            {/*End of RequireAuth*/}
          </Route>
          {/*End of Restaurants*/}
        </Route>
        {/*End of PersistAuth*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Markets() {
  return <Outlet />;
}

function Restaurants() {
  return <Outlet />;
}

export default App;
