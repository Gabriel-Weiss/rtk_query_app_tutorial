import "./App.css";
import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";

import MarketsGrid from "./features/MarketsGrid";
import RestaurantsGrid from "./features/RestaurantsGrid";
import Header from "./components/Header";
import Home from "./components/Home";
import RestaurantDetails from "./features/RestaurantDetails";
import NotFound from "./components/NotFound";
import MarketDetails from "./features/MarketDetails";
import AddRestaurantForm from "./features/AddRestaurantForm";
import EditRestaurantForm from "./features/EditRestaurantForm";
import AddMarketForm from "./features/AddMarketForm";
import EditMarketForm from "./features/EditMarketForm";
import Login from "./features/Login";
import RequireAuth from "./features/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="markets" element={<Markets />}>
          <Route index element={<MarketsGrid />} />
          <Route path=":id" element={<MarketDetails />} />
          <Route element={<RequireAuth />}>
            <Route path="add" element={<AddMarketForm />} />
            <Route path="edit/:id" element={<EditMarketForm />} />
          </Route>
        </Route>
        <Route path="restaurants" element={<Restaurants />}>
          <Route index element={<RestaurantsGrid />} />
          <Route path=":id" element={<RestaurantDetails />} />
          <Route element={<RequireAuth />}>
            <Route path="add" element={<AddRestaurantForm />} />
            <Route path="edit/:id" element={<EditRestaurantForm />} />
          </Route>
        </Route>
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
