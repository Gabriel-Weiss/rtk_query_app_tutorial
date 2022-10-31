import React from "react";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "react-toastify/dist/ReactToastify.css";
import NoItems from "../../components/NoItems";
import Spinner from "../../components/Spinner";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from "@mui/icons-material/Edit";
import logo from "../../static/images/logo.png";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { handlePriceLevel } from "../../utils/functions";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import useAuthentication from "../../hooks/useAuthentication";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";

import {
  useAddFoodMutation,
  useGetFoodsQuery,
} from "../../redux/foods/foodsApiSlice";
import FoodGrid from "../foods/FoodGrid";
import { useGetRestaurantQuery } from "../../redux/restaurants/restaurantsApiSlice";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: restaurant,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetRestaurantQuery(id);
  const [addFood] = useAddFoodMutation();
  const { isAdmin } = useAuthentication();
  const { foods = [] } = useGetFoodsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      foods: data?.filter((food) => {
        return food.restaurantId === id;
      }),
    }),
  });

  let content;
  isFetching && (content = <Spinner />);
  isError &&
    (content = (
      <Box alignSelf="center" mt={5}>
        {error}
      </Box>
    ));
  isSuccess &&
    (content = (
      <Box p={2} display="flex" flexDirection="column">
        <Card>
          <Box display="flex" flexDirection="row">
            <Box flexGrow={0.3} m={2}>
              {!isAdmin ? (
                <CardMedia component="img" image={logo} alt="Logo" />
              ) : (
                <Formik
                  initialValues={{
                    name: "",
                    price: "",
                    restaurantId: restaurant._id,
                    quantity: "",
                    category: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Required"),
                    price: Yup.number().required("Required"),
                  })}
                  onSubmit={async (values, { resetForm, setSubmitting }) => {
                    try {
                      await addFood(values).unwrap();
                      resetForm();
                      setSubmitting(false);
                      toast.success(
                        `Item ${values.name} added successfully!!!`
                      );
                    } catch (error) {
                      toast.error("Failed to add new menu!!!");
                      console.error("rejected", error.message);
                    }
                  }}
                >
                  {({ isValid, isSubmitting }) => (
                    <Form>
                      <Box display="flex" flexDirection="column">
                        <InputComponent label="Name" name="name" type="text" />
                        <InputComponent
                          label="Price"
                          name="price"
                          type="number"
                        />
                        <InputComponent
                          label="Quantity"
                          name="quantity"
                          type="number"
                        />
                        <InputComponent
                          label="Category"
                          name="category"
                          type="text"
                        />
                        <ButtonGroup
                          sx={{ mt: "20px" }}
                          fullWidth
                          size="medium"
                          disableElevation
                          variant="outlined"
                          orientation="horizontal"
                          aria-label="Add food options buttons"
                        >
                          <Button type="reset" color="warning">
                            Reset
                          </Button>
                          <Button
                            fullWidth
                            size="medium"
                            disableElevation
                            color="secondary"
                            variant="outlined"
                            disabled={!isValid || isSubmitting}
                            aria-label="Add food button"
                            data-testid="AddFoodButton"
                            type="submit"
                          >
                            Salveaza
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Form>
                  )}
                </Formik>
              )}
            </Box>
            <Box flexGrow={1} m={2}>
              <Typography variant="h3">{restaurant.name}</Typography>
              <Typography>
                Average delivery time: {restaurant.avg_delivery_time} min
              </Typography>
              <Typography>
                Price level: {handlePriceLevel(restaurant.price_level)}
              </Typography>
              {restaurant.ratings ? (
                <Stack direction="row">
                  <Typography color="secondary" component="legend">
                    Ratings:
                  </Typography>
                  <Rating value={restaurant.ratings.average} readOnly />
                </Stack>
              ) : (
                <Typography color="secondary" component="legend">
                  Ratings: no rating
                </Typography>
              )}
            </Box>
            <Box
              m={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <IconButton
                sx={{ border: "solid 3px", margin: "2px" }}
                style={{ display: !isAdmin && "none" }}
                color="secondary"
                onClick={() => navigate(`/restaurants/edit/${restaurant._id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ border: "solid 3px", margin: "2px" }}
                color="primary"
                onClick={() => navigate("/restaurants")}
              >
                <ArrowLeftOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
        <Box>
          {foods.length ? (
            foods.map((food) => <FoodGrid key={food._id} food={food} />)
          ) : (
            <NoItems />
          )}
        </Box>
      </Box>
    ));

  return content;
};

export default RestaurantDetails;
