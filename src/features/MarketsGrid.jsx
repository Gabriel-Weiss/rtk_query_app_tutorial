import React, { useState } from "react";
import "./css/Grid.css";
import Spinner from "../components/Spinner";
import { useGetMarketsQuery } from "../redux/markets/marketsApiSlice";
import MarketsCard from "./MarketsCard";
import { Link } from "react-router-dom";
import { selectUser } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";

const MarketsGrid = () => {
  const user = useSelector(selectUser);
  const { data = [], isLoading } = useGetMarketsQuery();
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
          {user && (
            <Link className="add-itme-link" to="/markets/add">
              Add Market
            </Link>
          )}
        </div>
      </div>
      <div className="container">
        {filteredData.map((market) => (
          <MarketsCard key={market.id} market={market} />
        ))}
      </div>
    </main>
  );
};

export default MarketsGrid;
