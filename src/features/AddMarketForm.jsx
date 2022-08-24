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
      values.price_level = parseInt(values.price_level);
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
      <div className="input-group">
        <label htmlFor="name">Market Name</label>
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
          <div>{formik.errors.price_level}</div>
        ) : null}
      </div>

      <div className="input-group">
        <label htmlFor="avg_delivery_time">Average Delivery Time</label>
        <input
          id="avg_delivery_time"
          type="number"
          {...formik.getFieldProps("avg_delivery_time")}
        />
        {formik.touched.avg_delivery_time && formik.errors.avg_delivery_time ? (
          <div>{formik.errors.avg_delivery_time}</div>
        ) : null}
      </div>

      <button type="submit">Salveaza</button>
    </form>
  );
};

export default AddMarketForm;
