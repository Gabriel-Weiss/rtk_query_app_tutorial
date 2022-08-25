import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/DetailsCard.css";
import Spinner from "../components/Spinner";
import { useGetMarketQuery } from "../redux/markets/marketsApiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilLine } from "react-icons/ri";
import { IoCaretBackCircleOutline } from "react-icons/io5";

const MarketDetails = () => {
  const id = useParams();
  const navigateTo = useNavigate();
  const { data: market, isFetching, isSuccess } = useGetMarketQuery(id);

  let content;
  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <section>
        <article className="content-border">
          <div className="item-content">
            <h2>{market.name}</h2>
            <h2>
              {market.ratings
                ? "Rating: " + market.ratings.average
                : "Rating: no rating"}
            </h2>
            <h2>Products: {market.format_cuisines}</h2>
            <h2>Average delivery time: {market.avg_delivery_time}</h2>
          </div>
          <div className="options-btn">
            <div
              className="edit-icon"
              onClick={() => navigateTo(`/markets/edit/${market.id}`)}
            >
              <RiPencilLine />
            </div>
            <div className="back-icon" onClick={() => navigateTo("/markets")}>
              <IoCaretBackCircleOutline />
            </div>
          </div>
        </article>
        <div className="products-container">
          <div className="add-product-form">
            <aside>
              <Formik
                initialValues={{ title: "", price: "" }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Required"),
                  price: Yup.number().required("Required"),
                })}
                onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 2));
                }}
              >
                <Form className="add-product-inputs">
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="text" />
                  <ErrorMessage className="error-message" name="title" />
                  <label htmlFor="price">Price</label>
                  <Field name="price" type="number" />
                  <ErrorMessage className="error-message" name="price" />

                  <button type="submit">Submit</button>
                </Form>
              </Formik>
            </aside>
          </div>
          <div className="products-list">
            {market.products ? (
              market.products.map((product) => <p key={product}>{product}</p>)
            ) : (
              <p>No Products</p>
            )}
          </div>
        </div>
      </section>
    );
  }
  return <div>{content}</div>;
};

export default MarketDetails;
