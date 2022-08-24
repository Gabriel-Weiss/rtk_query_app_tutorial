import React from "react";
import "./css/Grid.css";
import Spinner from "../components/Spinner";
import { MdSearch } from "react-icons/md";
import { useGetMarketsQuery } from "../redux/markets/marketsApiSlice";
import MarketsCard from "./MarketsCard";
import { Link } from "react-router-dom";

const MarketsGrid = () => {
  const { data = [], isLoading } = useGetMarketsQuery();

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
          <Link className="add-itme-link" to="/markets/add">
            Add Market
          </Link>
        </div>
      </div>
      <div className="container">
        {data.map((market) => (
          <MarketsCard key={market.id} market={market} />
        ))}
      </div>
    </main>
  );
};

export default MarketsGrid;
