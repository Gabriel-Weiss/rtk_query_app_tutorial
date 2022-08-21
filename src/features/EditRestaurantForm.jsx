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
  let id = useParams();
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
      try {
        await editRestaurant(values).unwrap();
        //TODO: solve invalidation cache problem
        navigateTo(`/restaurants/${restaurant.id}`);
      } catch (error) {
        console.error("Nu s-a putut salva intrarea", error);
        alert("Nu s-a putut salva intrarea");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Restaurant Name</label>
      <input id="name" type="text" {...formik.getFieldProps("name")} />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor="price_level">Price Level</label>
      <input
        id="price_level"
        type="number"
        {...formik.getFieldProps("price_level")}
      />
      {formik.touched.price_level && formik.errors.price_level ? (
        <div>{formik.errors.price_level}</div>
      ) : null}

      <label htmlFor="avg_delivery_time">Average Delivery Time</label>
      <input
        id="avg_delivery_time"
        type="number"
        {...formik.getFieldProps("avg_delivery_time")}
      />
      {formik.touched.avg_delivery_time && formik.errors.avg_delivery_time ? (
        <div>{formik.errors.avg_delivery_time}</div>
      ) : null}

      <button type="submit">Salveaza</button>
    </form>
  );
};

export default EditRetaurantForm;
