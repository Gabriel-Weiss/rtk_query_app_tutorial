import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="markets" element={<MarketsGrid />}></Route>
        <Route path="markets/:id" element={<MarketDetails />} />
        <Route path="markets/add" element={<AddMarketForm />} />
        <Route path="markets/edit/:id" element={<EditMarketForm />} />
        <Route path="restaurants" element={<RestaurantsGrid />} />
        <Route path="restaurants/:id" element={<RestaurantDetails />} />
        <Route path="restaurants/add" element={<AddRestaurantForm />} />
        <Route path="restaurants/edit/:id" element={<EditRestaurantForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
