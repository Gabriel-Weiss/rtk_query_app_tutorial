import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/AddForm.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  useGetMarketQuery,
  useUpdateMarketMutation,
} from "../../redux/markets/marketsApiSlice";

const EditMarketForm = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const { data: market } = useGetMarketQuery(id);
  const [editMarket] = useUpdateMarketMutation(id);

  return (
    <section className="loginFormSection">
      <h1>Add Market</h1>
      <Formik
        initialValues={market}
        validationSchema={Yup.object({
          name: Yup.string().required("* Numele localului este obligatoriu"),
          price_level: Yup.number().required("* Cimpul este obligatoriu"),
          avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
        })}
        onSubmit={async (values) => {
          values.price_level = parseInt(values.price_level);
          await editMarket(values)
            .unwrap()
            .then((payload) => {
              console.log("fulfilled", payload);
              navigateTo(`/markets/${values.id}`);
            })
            .catch((error) => {
              console.error("rejected", error.message);
              alert("Nu s-a putut salva intrarea");
            });
        }}
      >
        <Form data-testid="formikForm" className="loginFormInputs">
          <label htmlFor="name">Market Name</label>
          <Field id="name" name="name" type="text" data-testid="name" />
          <ErrorMessage className="error-message" name="name" component="div" />
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
          <ErrorMessage
            className="error-message"
            name="price_level"
            component="div"
          />
          <label htmlFor="avg_delivery_time">Average Delivery Time</label>
          <Field
            id="avg_delivery_time"
            name="avg_delivery_time"
            type="number"
            data-testid="avg_delivery_time"
          />
          <ErrorMessage
            className="error-message"
            name="avg_delivery_time"
            component="div"
          />

          <button data-testid="addMarketButton" type="submit">
            Salveaza
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default EditMarketForm;