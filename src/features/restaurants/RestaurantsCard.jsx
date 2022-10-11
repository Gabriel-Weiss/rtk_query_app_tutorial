import React from "react";
import "./css/GridCard.css";
import { Link } from "react-router-dom";
import { useDeleteRestaurantMutation } from "../../redux/restaurants/restaurantsApiSlice";
import { handlePriceLevel } from "../../utils/functions";
import useAuthentication from "../../hooks/useAuthentication";

const RestaurantsCard = ({ restaurant }) => {
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const { isAdmin } = useAuthentication();

  const handleDeleteResturant = async (id) => {
    await deleteRestaurant(id).unwrap();
  };

  return (
    <div className="grid-card">
      <div className="container-item">
        <Link className="container-list" to={`/restaurants/${restaurant._id}`}>
          <h3 className="card-body card-title">{restaurant.name}</h3>
          <p className="card-body card-text">{restaurant.format_cuisines}</p>
          <p className="card-body card-text">
            Price level: {handlePriceLevel(restaurant.price_level)}
          </p>
          <p className="card-body card-text">
            {restaurant.ratings
              ? "Rating: " + restaurant.ratings.average
              : "Rating: no rating"}
          </p>
        </Link>
        {isAdmin && (
          <div className="card-body card-footer">
            <button onClick={() => handleDeleteResturant(restaurant._id)}>
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsCard;
