import React, { useState } from "react";
import "./css/Grid.css";
import Spinner from "../../components/Spinner";
import RestaurantsCard from "./RestaurantsCard";
import { useGetRestaurantsQuery } from "../../redux/restaurants/restaurantsApiSlice";
import { Link } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

export default function RestaurantsGrid() {
  const { data = [], isLoading } = useGetRestaurantsQuery();
  const { isAdmin } = useAuthentication();
  const [search, setSearch] = useState("");

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const filteredData = search.length
    ? data.filter((market) => market.name.toLowerCase().includes(search))
    : data;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main>
      <div className="input-bar">
        <div className="search-item input-item">
          <input
            type="text"
            className="header_input"
            placeholder="Search"
            value={search}
            onChange={inputHandler}
          />
        </div>
        {isAdmin && (
          <div className="add-item input-item">
            <Link className="add-itme-link" to="/restaurants/add">
              Add Restaurant
            </Link>
          </div>
        )}
      </div>
      <div className="container">
        {filteredData.map((restaurant) => (
          <RestaurantsCard key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
