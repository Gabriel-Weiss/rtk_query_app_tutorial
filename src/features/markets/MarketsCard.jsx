import React from "react";
import "./css/GridCard.css";
import { Link } from "react-router-dom";
import { useDeleteMarketMutation } from "../../redux/markets/marketsApiSlice";
import { handlePriceLevel } from "../../utils/functions";
import { selectUser } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";

const MarketsCard = ({ market }) => {
  const [deleteMarket] = useDeleteMarketMutation();
  const user = useSelector(selectUser);
  const isAdmin = user?.username === "admin";

  const handleDeleteMarket = async (id) => {
    await deleteMarket(id).unwrap();
  };

  return (
    <div className="grid-card">
      <div className="container-item">
        <Link className="container-list" to={`/markets/${market._id}`}>
          <h3 className="card-body card-title">{market.name}</h3>
          <p className="card-body card-text">
            Price level: {handlePriceLevel(market.price_level)}
          </p>
          <p className="card-body card-text">
            Products: {market.format_cuisines}
          </p>
          <p className="card-body card-text">
            {market.ratings
              ? "Rating: " + market.ratings.average
              : "Rating: no rating"}
          </p>
        </Link>
        {isAdmin && (
          <div className="card-body card-footer">
            <button onClick={() => handleDeleteMarket(market._id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketsCard;
