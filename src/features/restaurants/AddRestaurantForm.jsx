import React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import { useAddRestaurantMutation } from "../../redux/restaurants/restaurantsApiSlice";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const AddRestaurantForm = () => {
  const navigate = useNavigate();
  const [addRestaurant] = useAddRestaurantMutation();

  const initialValues = {
    name: "",
    price_level: "",
    avg_delivery_time: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("* Numele localului este obligatoriu"),
    price_level: Yup.number().required("* Cimpul este obligatoriu"),
    avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
  });
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    values.price_level = parseInt(values.price_level);
    try {
      await addRestaurant(values).unwrap();
      resetForm();
      setSubmitting(false);
      navigate(`/restaurants`);
      toast.success(`Restaurant ${values.name} added successfully!!!`);
    } catch (error) {
      toast.error("rejected", error.message);
      console.error("rejected", error.message);
    }
  };

  return (
    <Box width={500} alignSelf="center" mt={5}>
      <Typography variant="h3" align="center">
        Add Restaurant
      </Typography>
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
            <SelectComponent
              label="Price level"
              type="number"
              name="price_level"
              data-testid="price_level"
            />
            <InputComponent
              label="Delivery time"
              name="avg_delivery_time"
              type="number"
              data-testid="avg_delivery_time"
            />
            <ButtonGroup
              sx={{ mt: "20px" }}
              fullWidth
              size="medium"
              disableElevation
              variant="outlined"
              orientation="horizontal"
              aria-label="Add restaurant page options buttons"
            >
              <Button
                type="reset"
                color="warning"
                startIcon={<ClearOutlinedIcon />}
              >
                Reset
              </Button>
              <Button
                fullWidth
                size="medium"
                disableElevation
                color="secondary"
                variant="outlined"
                startIcon={<SaveAltOutlinedIcon />}
                disabled={!isValid || isSubmitting}
                aria-label="Add restaurant button"
                data-testid="AddRestaurantButton"
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
    </Box>
  );
};

export default AddRestaurantForm;
