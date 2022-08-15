import React from "react";
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner';
import "./css/DetailsCard.css";
import { useGetRestaurantQuery } from "../redux/restaurants/restaurantsApiSlice";
import { handlePriceLevel } from '../utils/functions';

const RestaurantDetails = () => {
  let id = useParams();
  const { data: restaurant, isFetching, isSuccess } = useGetRestaurantQuery(id);

  let content;
  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <section>
        <article className="item-content">
          <h2>{restaurant.name}</h2>
          <h2>
            {restaurant.ratings
              ? "Rating: " + restaurant.ratings.average
              : "Rating: no rating"}
          </h2>
          <h2>Price level: {handlePriceLevel(restaurant.price_level)}</h2>
          <h2>Average delivery time: {restaurant.avg_delivery_time} min</h2>
        </article>
        <div className="item-foods">Foods</div>
      </section>
    );
  }

  return <div>{content}</div>;
};

export default RestaurantDetails;
