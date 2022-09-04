import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/AddForm.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useGetRestaurantQuery,
  useUpdateRestaurantMutation,
} from "../redux/restaurants/restaurantsApiSlice";

const EditRetaurantForm = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();

  const { data: restaurant } = useGetRestaurantQuery(id);
  const [editRestaurant] = useUpdateRestaurantMutation(id);

  const formik = useFormik({
    initialValues: restaurant,
    validationSchema: Yup.object({
      name: Yup.string().required("* Numele localului este obligatoriu"),
      price_level: Yup.number().required("* Cimpul este obligatoriu"),
      avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
    }),
    onSubmit: async (values) => {
      values.price_level = parseInt(values.price_level);
      try {
        await editRestaurant(values).unwrap();
        navigateTo(`/restaurants/${values.id}`);
      } catch (error) {
        alert("Nu s-a putut salva intrarea");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="input-group">
        <label htmlFor="name">Restaurant Name</label>
        <input id="name" type="text" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>

      <div className="input-group">
        <label htmlFor="price_level">Price Level</label>
        <select
          id="price_level"
          type="number"
          name="price_level"
          {...formik.getFieldProps("price_level")}
        >
          <option value="">Select level</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        {formik.touched.price_level && formik.errors.price_level ? (
          <div className="error-message">{formik.errors.price_level}</div>
        ) : null}
      </div>

      <div className="input-group">
        <label htmlFor="avg_delivery_time">Average Delivery Time</label>
        <input
          id="avg_delivery_time"
          type="number"
          step={10}
          {...formik.getFieldProps("avg_delivery_time")}
        />
        {formik.touched.avg_delivery_time && formik.errors.avg_delivery_time ? (
          <div>{formik.errors.avg_delivery_time}</div>
        ) : null}
      </div>

      <button className="add-btn" type="submit">
        Salveaza
      </button>
    </form>
  );
};

export default EditRetaurantForm;
