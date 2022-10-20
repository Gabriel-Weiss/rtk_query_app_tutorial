import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "./css/DetailsCard.css";
import "./css/AddForm.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetMarketQuery } from "../../redux/markets/marketsApiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RiPencilLine } from "react-icons/ri";
import { IoCaretBackCircleOutline } from "react-icons/io5";
import {
  useAddProductMutation,
  useGetProductsQuery,
} from "../../redux/products/productsApiSlice";
import useAuthentication from "../../hooks/useAuthentication";
import ProductsGrid from "../products/ProductsGrid";
import NoItems from "../../components/NoItems";

const MarketDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const {
    data: market,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetMarketQuery(id);
  const [addProduct] = useAddProductMutation();
  const { isAdmin } = useAuthentication();
  const { products = [] } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      products: data?.filter((product) => {
        return product.marketId === id;
      }),
    }),
  });
  const notifySuccessProductAdd = () => {
    toast.success("New product added!!!");
  };

  const notifyErrorProductAdd = () => {
    toast.error("Failed to add new product!!!");
  };

  let content;

  isFetching && (content = <Spinner />);
  isError && (content = <p>{error}</p>);
  isSuccess &&
    (content = (
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
              style={{ display: !isAdmin && "none" }}
              onClick={() => navigateTo(`/markets/edit/${market._id}`)}
            >
              <RiPencilLine />
            </div>
            <div className="back-icon" onClick={() => navigateTo("/markets")}>
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
                  marketId: market._id,
                  description: "",
                  category: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string().required("Required"),
                  price: Yup.number().required("Required"),
                })}
                onSubmit={async (values, { resetForm }) => {
                  const { name, price, marketId, description, category } =
                    values;
                  await addProduct({
                    name,
                    price,
                    marketId,
                    description,
                    category,
                  })
                    .unwrap()
                    .then((payload) => {
                      toast.success(
                        `Product ${payload.name} added successfully!!!`
                      );
                      resetForm({ values: "" });
                      console.log(payload);
                    })
                    .catch((error) => {
                      toast.error("Failed to add new product!!!");
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
                  <label htmlFor="description">Description</label>
                  <Field as="textarea" name="description" type="number" />
                  <ErrorMessage
                    className="error-message"
                    name="description"
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
            {products.length ? (
              products.map((product) => (
                <ProductsGrid key={product._id} product={product} />
              ))
            ) : (
              <NoItems />
            )}
          </div>
        </div>
      </section>
    ));

  return content;
};

export default MarketDetails;
