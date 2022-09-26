import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "./css/DetailsCard.css";
import "./css/AddForm.css";
import { useGetRestaurantQuery } from "../../redux/restaurants/restaurantsApiSlice";
import { handlePriceLevel } from "../../utils/functions";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";
import {
  useAddFoodMutation,
  useGetFoodsQuery,
} from "../../redux/foods/foodsApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/authSlice";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const { data: restaurant, isFetching, isSuccess } = useGetRestaurantQuery(id);
  const { data: foods = [] } = useGetFoodsQuery();
  const [addFood] = useAddFoodMutation();
  const user = useSelector(selectUser);
  const isAdmin = user?.username === "admin";

  const productsDiv = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const productsP = {
    marginTop: "30%",
    fontSize: "22px",
    fontStyle: "italic",
  };

  const foodsInRestaurant = useMemo(() => {
    return foods.filter((food) => food.restaurantId === Number(id));
  }, [foods, id]);

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
              style={{ display: !isAdmin && "none" }}
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
        <div className="products-container">
          <div
            className="add-product-form"
            style={{ display: !isAdmin && "none" }}
          >
            <aside>
              <Formik
                initialValues={{
                  name: "",
                  price: "",
                  restaurantId: restaurant.id,
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
                      resetForm({ values: "" });
                      console.log("fulfilled", payload);
                    })
                    .catch((error) => console.error("rejected", error.message));
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
            </aside>
          </div>

          <div className="products-list">
            {foodsInRestaurant.length ? (
              foodsInRestaurant.map((food) => (
                <p key={food.id}>
                  {food.name}, {food.quantity} gr : {food.price} lei
                </p>
              ))
            ) : (
              <div style={productsDiv}>
                <p style={productsP}>No products found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return <div>{content}</div>;
};

export default RestaurantDetails;
