import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAddMarketMutation } from "../redux/markets/marketsApiSlice";

const AddMarketForm = () => {
  let navigateTo = useNavigate();
  const [addMarket] = useAddMarketMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      price_level: "",
      avg_delivery_time: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("* Numele localului este obligatoriu"),
      price_level: Yup.number().required("* Cimpul este obligatoriu"),
      avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
    }),
    onSubmit: async (values) => {
      try {
        await addMarket(values).unwrap();
        navigateTo(`/markets`);
      } catch (error) {
        console.error("Nu s-a putut salva intrarea", error);
        alert("Nu s-a putut salva intrarea");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Market Name</label>
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

export default AddMarketForm;
