import React from "react";
import "./css/LoginForm.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/auth/authApiSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [login] = useLoginMutation();

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
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          const { username, password } = values;
          try {
            const { accessToken } = await login({
              username,
              password,
            }).unwrap();
            dispatch(setCredentials(accessToken));
            resetForm({ values: "" });
            navigateTo(-1);
          } catch (error) {
            if (!error.status) {
              console.log("No server response");
            } else if (error.status === 400) {
              console.log("Missing credentials");
            } else if (error.status === 401) {
              console.log("Unauthorized");
            } else {
              resetForm({ values: " " });
              console.error("rejected", error.message);
            }
          }
        }}
      >
        <Form className="loginFormInputs">
          <label htmlFor="username">Username</label>
          <Field
            data-testid="username"
            name="username"
            type="text"
            autoComplete="off"
          />
          <ErrorMessage
            className="error-message"
            name="username"
            component="div"
          />
          <label htmlFor="password">Password</label>
          <Field
            data-testid="password"
            name="password"
            type="password"
            autoComplete="off"
          />
          <ErrorMessage
            className="error-message"
            name="password"
            component="div"
          />

          <button
            data-testid="loginButton"
            className="loginButton"
            type="submit"
          >
            Submit
          </button>
          <Link to="/register">Not registered. Sign up now !!!</Link>
        </Form>
      </Formik>
    </section>
  );
};

export default Login;
