import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "./css/DetailsCard.css";
import { useGetRestaurantQuery } from "../redux/restaurants/restaurantsApiSlice";
import { handlePriceLevel } from "../utils/functions";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";

const RestaurantDetails = () => {
  const id = useParams();
  const navigateTo = useNavigate();
  const { data: restaurant, isFetching, isSuccess } = useGetRestaurantQuery(id);

  let content;
  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <section>
        <article className="content-border">
          <div className="item-content">
            <h2>{restaurant.name}</h2>
            <h2>
              {restaurant.ratings
                ? "Rating: " + restaurant.ratings.average
                : "Rating: no rating"}
            </h2>
            <h2>Price level: {handlePriceLevel(restaurant.price_level)}</h2>
            <h2>Average delivery time: {restaurant.avg_delivery_time} min</h2>
          </div>
          <div className="options-btn">
            <div
              className="edit-icon"
              onClick={() => navigateTo(`/restaurants/edit/${restaurant.id}`)}
            >
              <RiPencilLine />
            </div>
            <div
              className="back-icon"
              onClick={() => navigateTo("/restaurants")}
            >
              <IoCaretBackCircleOutline />
            </div>
          </div>
        </article>
        <div className="item-products">
          {restaurant.products ? (
            restaurant.products.map((product) => <p key={product}>{product}</p>)
          ) : (
            <p>No Products</p>
          )}
        </div>
      </section>
    );
  }

  return <div>{content}</div>;
};

export default RestaurantDetails;
