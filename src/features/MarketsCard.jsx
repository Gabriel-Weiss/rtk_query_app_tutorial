import React from "react";
import "./css/GridCard.css";
import { Link } from "react-router-dom";
import { useDeleteMarketMutation } from "../redux/markets/marketsApiSlice";
import { handlePriceLevel } from "../utils/functions";

const MarketsCard = ({ market }) => {
  const [deleteMarket] = useDeleteMarketMutation();

  const handleDeleteMarket = async (id) => {
    await deleteMarket(id).unwrap();
  };

  return (
    <div className="grid-card">
      <div className="container-item">
        <Link to={`/magazine/${market.id}`}>
          <h5 className="card-body card-title">{market.name}</h5>
          <p className="card-body card-text">
            Price level: {handlePriceLevel(market.price_level)}
          </p>
          <p className="card-body card-text">
            Products: {market.format_cuisines}
          </p>
        </Link>
        <div className="card-body card-footer">
          <button onClick={() => handleDeleteMarket(market.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MarketsCard;
