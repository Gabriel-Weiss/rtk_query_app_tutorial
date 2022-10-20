import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "./css/DetailsCard.css";
import "./css/AddForm.css";
import { useGetRestaurantQuery } from "../../redux/restaurants/restaurantsApiSlice";
import { handlePriceLevel } from "../../utils/functions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";
import {
  useAddFoodMutation,
  useGetFoodsQuery,
} from "../../redux/foods/foodsApiSlice";
import useAuthentication from "../../hooks/useAuthentication";
import FoodGrid from "../foods/FoodGrid";
import NoItems from "../../components/NoItems";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const {
    data: restaurant,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetRestaurantQuery(id);
  const [addFood] = useAddFoodMutation();
  const { isAdmin } = useAuthentication();
  const { foods = [] } = useGetFoodsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      foods: data?.filter((food) => {
        return food.restaurantId === id;
      }),
    }),
  });

  let content;

  isFetching && (content = <Spinner />);
  isError && (content = <p>{error}</p>);
  isSuccess &&
    (content = (
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
              style={{ display: !isAdmin && "none" }}
              onClick={() => navigateTo(`/restaurants/edit/${restaurant._id}`)}
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
        <div className="products-container">
          {isAdmin && (
            <div
              className="add-product-form"
              style={{ display: !isAdmin ? "none" : "" }}
            >
              <Formik
                initialValues={{
                  name: "",
                  price: "",
                  restaurantId: restaurant._id,
                  quantity: "",
                  category: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Required"),
                  price: Yup.number().required("Required"),
                })}
                onSubmit={async (values, { resetForm }) => {
                  const { name, price, restaurantId, quantity, category } =
                    values;
                  await addFood({
                    name,
                    price,
                    restaurantId,
                    quantity,
                    category,
                  })
                    .unwrap()
                    .then((payload) => {
                      toast.success(
                        `New menu ${payload.name} added successfully!!!`
                      );
                      resetForm({ values: "" });
                      console.log(payload);
                    })
                    .catch((error) => {
                      toast.error("Failed to add new menu!!!");
                      console.error("rejected", error.message);
                    });
                }}
              >
                <Form className="add-product-inputs">
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" />
                  <ErrorMessage
                    className="error-message"
                    name="name"
                    component="div"
                  />
                  <label htmlFor="price">Price</label>
                  <Field name="price" type="number" />
                  <ErrorMessage
                    className="error-message"
                    name="price"
                    component="div"
                  />
                  <label htmlFor="quantity">Quantity</label>
                  <Field name="quantity" type="number" />
                  <ErrorMessage
                    className="error-message"
                    name="quantity"
                    component="div"
                  />
                  <label htmlFor="category">Category</label>
                  <Field name="category" type="text" />
                  <ErrorMessage
                    className="error-message"
                    name="category"
                    component="div"
                  />

                  <button type="submit">Submit</button>
                </Form>
              </Formik>
            </div>
          )}

          <div className="products-list">
            {foods.length ? (
              foods.map((food) => <FoodGrid key={food._id} food={food} />)
            ) : (
              <NoItems />
            )}
          </div>
        </div>
      </section>
    ));

  return content;
};

export default RestaurantDetails;
