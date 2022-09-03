import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/DetailsCard.css";
import Spinner from "../components/Spinner";
import { useGetMarketQuery } from "../redux/markets/marketsApiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilLine } from "react-icons/ri";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "../redux/products/productsApiSlice";

const MarketDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const { data: market, isFetching, isSuccess } = useGetMarketQuery(id);
  const { data: products = [] } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();

  const productsInMarket = useMemo(() => {
    return products.filter((product) => product.marketId == id);
  }, [products]);

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
                initialValues={{
                  title: "",
                  price: "",
                  marketId: market.id,
                  description: "",
                  category: "",
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Required"),
                  price: Yup.number().required("Required"),
                })}
                onSubmit={async (values, { resetForm }) => {
                  await addProduct(values)
                    .unwrap()
                    .then((payload) => {
                      resetForm({ values: "" });
                      console.log("fulfilled", payload);
                    })
                    .catch((error) => console.error("rejected", error));
                  // navigateTo(`/markets/${market.id}`);
                }}
              >
                <Form className="add-product-inputs">
                  <label htmlFor="title">Title</label>
                  <Field name="title" type="text" />
                  <ErrorMessage className="error-message" name="title" />
                  <label htmlFor="price">Price</label>
                  <Field name="price" type="number" />
                  <ErrorMessage className="error-message" name="price" />
                  <label htmlFor="description">Description</label>
                  <Field as="textarea" name="description" type="number" />
                  <ErrorMessage className="error-message" name="description" />
                  <label htmlFor="category">Category</label>
                  <Field name="category" type="text" />
                  <ErrorMessage className="error-message" name="category" />

                  <button type="submit">Submit</button>
                </Form>
              </Formik>
            </aside>
          </div>
          <div className="products-list">
            {productsInMarket.map((product) => (
              <p key={product.id}>
                {product.title.substring(0, 20) + "... - " + product.price} lei
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return <div>{content}</div>;
};

export default MarketDetails;
