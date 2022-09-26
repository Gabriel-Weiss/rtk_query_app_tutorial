import React from "react";
import "./css/AddForm.css";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import {
  useGetUsersQuery,
  useSignUpMutation,
} from "../../redux/auth/authApiSlice";

const RegisterUser = () => {
  const navigateTo = useNavigate();
  const [addUser] = useSignUpMutation();
  const { data: users } = useGetUsersQuery();

  let passwords = users.map((user) => user.password);
  let usernames = users.map((user) => user.username);
  let emails = users.map((user) => user.email);

  return (
    <section className="loginFormSection">
      <h1>Register</h1>
      <Formik
        initialValues={{
          name: "",
          password: "",
          username: "",
          email: "",
          phone: "",
          company: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("* Numele este obligatoriu"),
          password: Yup.string()
            .notOneOf(passwords, "This password is already in use")
            .required("* Parola este obligatorie"),
          username: Yup.string()
            .notOneOf(usernames, `This username is already in use`)
            .required("* Nickname-ul este obligatoriu"),
          email: Yup.string()
            .email("Invalid email address")
            .notOneOf(emails, "This email address is already in use")
            .required("Required"),
          phone: Yup.string().required("* Telefonul este obligatoriu"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await addUser(values)
            .unwrap()
            .then((payload) => {
              setSubmitting(false);
              console.log("fulfilled ", payload);
              navigateTo("/");
            })
            .catch((error) => console.error("rejected ", error.message));
        }}
      >
        {({ isSubmitting }) => (
          <Form data-testid="formikForm" className="loginFormInputs">
            <label htmlFor="name">Your Name</label>
            <Field id="name" name="name" type="text" data-testid="fullName" />
            <ErrorMessage
              className="error-message"
              name="name"
              component="div"
            />

            <label htmlFor="password">Your Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              data-testid="userPsw"
            />
            <ErrorMessage
              className="error-message"
              name="password"
              component="div"
            />

            <label htmlFor="username">Your Username</label>
            <Field
              id="username"
              name="username"
              type="text"
              data-testid="userName"
            />
            <ErrorMessage
              className="error-message"
              name="username"
              component="div"
            />

            <label htmlFor="email">Your Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              data-testid="userEmail"
            />
            <ErrorMessage
              className="error-message"
              name="email"
              component="div"
            />

            <label htmlFor="phone">Your Phone</label>
            <Field
              id="phone"
              name="phone"
              type="text"
              data-testid="userPhone"
            />
            <ErrorMessage
              className="error-message"
              name="phone"
              component="div"
            />

            <label htmlFor="company">Your Company</label>
            <Field
              id="company"
              name="company"
              type="text"
              data-testid="userCompany"
            />
            <ErrorMessage
              className="error-message"
              name="company"
              component="div"
            />

            <button
              className="add-btn"
              data-testid="addUserBtn"
              type="submit"
              disabled={isSubmitting}
            >
              Salveaza
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterUser;
