import React, { useState } from "react";
import "./css/Grid.css";
import Spinner from "../components/Spinner";
import { MdSearch } from "react-icons/md";
import RestaurantsCard from "./RestaurantsCard";
import { useGetRestaurantsQuery } from "../redux/restaurants/restaurantsApiSlice";
import { Link } from "react-router-dom";

export default function RestaurantsGrid() {
  const { data = [], isLoading } = useGetRestaurantsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main>
      <div className="input-bar">
        <div className="search-item input-item">
          <input type="text" className="header_input" placeholder="Search" />
          <i className="search_icon" aria-hidden="true">
            <MdSearch />
          </i>
        </div>
        <div className="add-item input-item">
          <Link to="/restaurants/add">Add Restaurant</Link>
        </div>
      </div>
      <div className="container">
        {data.map((restaurant) => (
          <RestaurantsCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
