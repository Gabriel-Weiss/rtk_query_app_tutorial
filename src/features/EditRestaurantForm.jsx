import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/AddForm.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  useGetRestaurantQuery,
  useUpdateRestaurantMutation,
} from "../redux/restaurants/restaurantsApiSlice";

const EditRetaurantForm = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const { data: restaurant } = useGetRestaurantQuery(id);
  const [editRestaurant] = useUpdateRestaurantMutation(id);

  return (
    <section className="loginFormSection">
      <h1>Edit Restaurant</h1>
      <Formik
        initialValues={restaurant}
        validationSchema={Yup.object({
          name: Yup.string().required("* Numele localului este obligatoriu"),
          price_level: Yup.number().required("* Cimpul este obligatoriu"),
          avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
        })}
        onSubmit={async (values, { resetForm }) => {
          values.price_level = parseInt(values.price_level);
          await editRestaurant(values)
            .unwrap()
            .then((payload) => {
              console.log("fulfilled", payload);
              navigateTo(`/restaurants/${values.id}`);
            })
            .catch((error) => {
              console.error("rejected", error.message);
              alert("Nu s-a putut salva intrarea");
            });
        }}
      >
        <Form data-testid="formikForm" className="loginFormInputs">
          <label htmlFor="name">Restaurant Name</label>
          <Field id="name" name="name" type="text" data-testid="name" />
          <ErrorMessage className="error-message" name="name" />
          <label htmlFor="price_level">Price Level</label>
          <Field
            as="select"
            id="price_level"
            type="number"
            name="price_level"
            data-testid="price_level"
          >
            <option value="">Select level</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </Field>
          <ErrorMessage className="error-message" name="price_level" />
          <label htmlFor="avg_delivery_time" step={10}>
            Average Delivery Time
          </label>
          <Field
            id="avg_delivery_time"
            name="avg_delivery_time"
            type="number"
            data-testid="avg_delivery_time"
          />
          <ErrorMessage className="error-message" name="avg_delivery_time" />

          <button
            className="add-btn"
            data-testid="addMarketButton"
            type="submit"
          >
            Salveaza
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default EditRetaurantForm;
