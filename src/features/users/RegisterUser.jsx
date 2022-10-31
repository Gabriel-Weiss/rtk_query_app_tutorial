import React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputComponent from "../../components/InputComponent";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import {
  useAddUserMutation,
  // useGetUsersQuery,
} from "../../redux/users/usersApiSlice";
// import { useState } from "react";

const RegisterUser = () => {
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();
  // const { data } = useGetUsersQuery();
  // const [usernames, setUsernames] = useState([]);
  // const [emails, setEmails] = useState([]);

  const initialValues = {
    name: "",
    password: "",
    username: "",
    email: "",
    phone: "",
    company: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("* Numele este obligatoriu"),
    password: Yup.string().required("* Parola este obligatorie"),
    username: Yup.string()
      // .notOneOf(usernames, `This username is already in use`)
      .required("* Username-ul este obligatoriu"),
    email: Yup.string()
      .email("Invalid email address")
      // .notOneOf(emails, "This email address is already in use")
      .required("Required"),
    phone: Yup.string().required("* Telefonul este obligatoriu"),
  });
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await addUser(values).unwrap();
      setSubmitting(false);
      resetForm();
      navigate("/login");
      toast.success(`User ${values.username} registered successfully!!!`);
    } catch (error) {
      console.error("rejected", error.message);
      toast.error("rejected", error.message);
    }
  };

  return (
    <Box width={500} alignSelf="center" mt={5}>
      <Typography variant="h3" align="center">
        Register
      </Typography>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, isSubmitting }) => (
            <Form data-testid="formikForm">
              <InputComponent
                id="name"
                label="Name"
                name="name"
                type="text"
                autoComplete="off"
                data-testid="fullName"
              />
              <InputComponent
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="off"
                data-testid="userPsw"
              />
              <InputComponent
                id="username"
                label="Username"
                name="username"
                type="text"
                autoComplete="off"
                data-testid="userName"
              />
              <InputComponent
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="off"
                data-testid="userEmail"
              />
              <InputComponent
                id="phone"
                label="Phone"
                name="phone"
                type="text"
                autoComplete="off"
                data-testid="userPhone"
              />
              <InputComponent
                id="company"
                label="Company"
                name="company"
                type="text"
                autoComplete="off"
                data-testid="userCompany"
              />
              <ButtonGroup
                sx={{ mt: "20px" }}
                fullWidth
                size="medium"
                disableElevation
                variant="outlined"
                orientation="horizontal"
                aria-label="Logup page options buttons"
              >
                <Button
                  type="reset"
                  color="warning"
                  startIcon={<ClearOutlinedIcon />}
                >
                  Clear
                </Button>
                <Button
                  fullWidth
                  size="medium"
                  disableElevation
                  color="secondary"
                  variant="outlined"
                  startIcon={<PersonAddOutlinedIcon />}
                  disabled={!isValid || isSubmitting}
                  aria-label="Save user button"
                  data-testid="SaveUserButton"
                  type="submit"
                >
                  Salveaza
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate(-1)}
                  color="primary"
                  startIcon={<KeyboardBackspaceOutlinedIcon />}
                >
                  Back
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default RegisterUser;
