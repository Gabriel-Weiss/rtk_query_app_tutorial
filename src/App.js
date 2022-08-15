import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import MarketsGrid from "./features/MarketsGrid";
import RestaurantsGrid from "./features/RestaurantsGrid";
import Header from "./components/Header";
import Home from "./components/Home";
import RestaurantDetails from "./features/RestaurantDetails";
import NotFound from "./components/NotFound";
import MarketDetails from "./features/MarketDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
          <Route path="restaurants" element={<RestaurantsGrid />}>
            <Route path=":id" element={<RestaurantDetails />} />
          </Route>
          <Route path="magazine" element={<MarketsGrid />}>
            <Route path=":id" element={<MarketDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
