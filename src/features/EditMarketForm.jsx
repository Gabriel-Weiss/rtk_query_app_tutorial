import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/AddForm.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useGetMarketQuery,
  useUpdateMarketMutation,
} from "../redux/markets/marketsApiSlice";

const EditMarketForm = () => {
  let id = useParams();
  const navigateTo = useNavigate();

  const { data: market } = useGetMarketQuery(id);
  const [editMarket] = useUpdateMarketMutation(id);

  const formik = useFormik({
    initialValues: market,
    validationSchema: Yup.object({
      name: Yup.string().required("* Numele localului este obligatoriu"),
      price_level: Yup.number().required("* Cimpul este obligatoriu"),
      avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
    }),
    onSubmit: async (values) => {
      values.price_level = parseInt(values.price_level);
      try {
        await editMarket(values).unwrap();
        navigateTo(`/markets/${values.id}`);
      } catch (error) {
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

export default EditMarketForm;
