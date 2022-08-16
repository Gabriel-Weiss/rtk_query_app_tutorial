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
import AddMarketForm from "./features/AddMarketForm";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="restaurants" element={<RestaurantsGrid />} />
        <Route path="magazine" element={<MarketsGrid />} />
        <Route path="restaurants/:id" element={<RestaurantDetails />} />
        <Route path="restaurants/add" element={<AddRestaurantForm />} />
        <Route path="magazine/:id" element={<MarketDetails />} />
        <Route path="magazine/add" element={<AddMarketForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
