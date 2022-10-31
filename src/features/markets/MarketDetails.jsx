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
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../../components/InputComponent";
import useAuthentication from "../../hooks/useAuthentication";
import TextareaComponent from "../../components/TextareaComponent";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";

import {
  useAddProductMutation,
  useGetProductsQuery,
} from "../../redux/products/productsApiSlice";
import ProductsGrid from "../products/ProductsGrid";
import { useGetMarketQuery } from "../../redux/markets/marketsApiSlice";

const MarketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: market,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetMarketQuery(id);
  const [addProduct] = useAddProductMutation();
  const { isAdmin } = useAuthentication();
  const { products = [] } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      products: data?.filter((product) => {
        return product.marketId === id;
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
                    marketId: market._id,
                    description: "",
                    category: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Required"),
                    price: Yup.number().required("Required"),
                  })}
                  onSubmit={async (values, { resetForm, setSubmitting }) => {
                    try {
                      await addProduct(values).unwrap();
                      resetForm();
                      setSubmitting(false);
                      toast.success(
                        `Item ${values.name} added successfully!!!`
                      );
                    } catch (error) {
                      toast.error("Failed to add new product!!!");
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
                        <TextareaComponent
                          label="Description"
                          name="description"
                          type="text"
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
                          aria-label="Add products options buttons"
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
                            aria-label="Add product button"
                            data-testid="AddProductButton"
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
              <Typography variant="h3">{market.name}</Typography>
              <Typography>
                Average delivery time: {market.avg_delivery_time}
              </Typography>
              <Typography>Products: {market.format_cuisines}</Typography>
              {market.ratings ? (
                <Stack direction="row">
                  <Typography color="secondary" component="legend">
                    Ratings:
                  </Typography>
                  <Rating value={market.ratings.average} readOnly />
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
                onClick={() => navigate(`/markets/edit/${market._id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ border: "solid 3px", margin: "2px" }}
                color="primary"
                onClick={() => navigate("/markets")}
              >
                <ArrowLeftOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
        <Box flexGrow={2}>
          {products.length ? (
            products.map((product) => (
              <ProductsGrid key={product._id} product={product} />
            ))
          ) : (
            <NoItems />
          )}
        </Box>
      </Box>
    ));

  return content;
};

export default MarketDetails;
