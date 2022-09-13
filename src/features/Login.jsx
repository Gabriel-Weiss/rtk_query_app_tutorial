import React from "react";
import "./css/LoginForm.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetUsersQuery } from "../redux/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { data: users } = useGetUsersQuery();

  const checkUser = (username, password) => {
    return users.some(
      (user) => user.username === username && user.password === password
    );
  };

  return (
    <section className="loginFormSection">
      <h1>Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Required"),
          password: Yup.number().required("Required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          const { username, password } = values;
          if (checkUser(username, password)) {
            resetForm({ values: "" });
            dispatch(setCredentials({ username, password }));
            navigateTo("/");
          } else {
            alert("User credentials are not correct");
          }
        }}
      >
        <Form className="loginFormInputs">
          <label htmlFor="username">Username</label>
          <Field data-testid="username" name="username" type="text" />
          <ErrorMessage className="error-message" name="username" />
          <label htmlFor="password">Password</label>
          <Field data-testid="password" name="password" type="password" />
          <ErrorMessage className="error-message" name="password" />

          <button
            data-testid="loginButton"
            className="loginButton"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default Login;
