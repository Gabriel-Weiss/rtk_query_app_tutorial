import React, { useState } from "react";
import "./css/Grid.css";
import Spinner from "../../components/Spinner";
import RestaurantsCard from "./RestaurantsCard";
import { useGetRestaurantsQuery } from "../../redux/restaurants/restaurantsApiSlice";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

export default function RestaurantsGrid() {
  const user = useSelector(selectUser);
  const isAdmin = user?.username === "admin";

  const { data = [], isLoading } = useGetRestaurantsQuery();
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
        <div className="add-item input-item">
          {isAdmin && (
            <Link className="add-itme-link" to="/restaurants/add">
              Add Restaurant
            </Link>
          )}
        </div>
      </div>
      <div className="container">
        {filteredData.map((restaurant) => (
          <RestaurantsCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
