import React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import {
  useGetMarketQuery,
  useUpdateMarketMutation,
} from "../../redux/markets/marketsApiSlice";

const EditMarketForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: market } = useGetMarketQuery(id);
  const [editMarket] = useUpdateMarketMutation(id);

  const validationSchema = Yup.object({
    name: Yup.string().required("* Numele localului este obligatoriu"),
    price_level: Yup.number().required("* Cimpul este obligatoriu"),
    avg_delivery_time: Yup.number().required("* Cimpul este obligatoriu"),
  });

  const onSubmit = async (values) => {
    values.price_level = parseInt(values.price_level);
    await editMarket(values)
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        navigate(`/markets/${values._id}`);
      })
      .catch((error) => {
        console.error("rejected", error.message);
        alert("Nu s-a putut salva intrarea");
      });
  };

  return (
    <Box width={500} alignSelf="center" mt={5}>
      <Typography variant="h3" align="center">
        Edit Market
      </Typography>
      <Formik
        initialValues={market}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <Form data-testid="formikForm">
            <InputComponent
              label="Name"
              name="name"
              type="text"
              data-testid="name"
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
              aria-label="Edit market page options buttons"
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
                aria-label="Update market button"
                data-testid="UpdateMarketButton"
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

export default EditMarketForm;
