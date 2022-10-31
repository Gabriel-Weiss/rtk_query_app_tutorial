import React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/auth/authSlice";
import InputComponent from "../../components/InputComponent";
import { useLoginMutation } from "../../redux/auth/authApiSlice";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    const { username, password } = values;
    try {
      const { accessToken } = await login({
        username,
        password,
      }).unwrap();
      dispatch(setCredentials(accessToken));
      resetForm();
      setSubmitting(false);
      navigate("/");
      toast.success("Login successfull!!!");
    } catch (error) {
      if (!error.status) {
        toast.warn("No server response!!!");
        console.log("No server response");
      } else if (error.status === 400) {
        toast.warn("Missing credentials");
        console.log("Missing credentials");
      } else if (error.status === 401) {
        toast.warn("Incorrect credentials!!!");
        console.log("Incorrect credentials!!!");
      } else {
        resetForm();
        console.error("rejected", error.message);
        toast.error("rejected", error.message);
      }
    }
  };

  return (
    <Box width={500} alignSelf="center" mt={5}>
      <Typography variant="h3" align="center">
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <InputComponent
              type="text"
              label="Username"
              name="username"
              autoComplete="off"
            />

            <InputComponent
              type="password"
              label="Password"
              name="password"
              autoComplete="off"
            />
            <ButtonGroup
              sx={{ mt: "20px" }}
              fullWidth
              size="medium"
              disableElevation
              variant="outlined"
              orientation="horizontal"
              aria-label="Login page options buttons"
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
                startIcon={<LockOpenOutlinedIcon />}
                disabled={!isValid || isSubmitting}
                aria-label="Login button"
                data-testid="loginButton"
                type="submit"
              >
                Submit
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
            <Typography variant="button" align="center" mt={2}>
              <Link to="/register">Not registered. Sign up now !!!</Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
