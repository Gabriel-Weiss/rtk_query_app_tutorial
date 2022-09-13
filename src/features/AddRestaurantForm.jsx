import React from "react";
import "./css/AddForm.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useAddRestaurantMutation } from "../redux/restaurants/restaurantsApiSlice";
import { useNavigate } from "react-router-dom";

const AddRestaurantForm = () => {
  let navigateTo = useNavigate();
  const [addRestaurant] = useAddRestaurantMutation();

  return (
    <section className="loginFormSection">
      <h1>Add Restaurant</h1>
      <Formik
        initialValues={{
          name: "",
          price_level: "",
          avg_delivery_time: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("* Numele localului este obligatoriu"),
          price_level: Yup.number().required("* Cimpul este obligatoriu"),
          avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
        })}
        onSubmit={async (values, { resetForm }) => {
          values.price_level = parseInt(values.price_level);
          await addRestaurant(values)
            .unwrap()
            .then((payload) => {
              resetForm({ values: "" });
              console.log("fulfilled", payload);
              navigateTo(`/restaurants`);
            })
            .catch((error) => console.error("rejected", error.message));
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
            data-testid="addRestaurantButton"
            type="submit"
          >
            Salveaza
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default AddRestaurantForm;
