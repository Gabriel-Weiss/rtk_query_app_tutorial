import React from "react";
import { Box, ButtonGroup, Stack } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";

const ProductsGrid = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => dispatch(addToCart(product));

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      sx={{
        marginTop: "5px",
      }}
    >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <Typography component={"span"}>{product.name}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingTop: "0",
            paddingBottom: "0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              "& > *": {
                m: 1,
              },
            }}
          >
            <Stack>
              <Typography component="span">
                Pretul: {product.price} lei/buc
              </Typography>
              <Typography component="span">
                Categorie: {product.category}
              </Typography>
              <Typography component="span">
                Descriere: {product.description}
              </Typography>
            </Stack>
            <ButtonGroup aria-label="items options add to cart delete view details">
              <IconButton
                sx={{ border: "solid 0.5px", margin: "2px" }}
                color="secondary"
                aria-label="add to cart"
                onClick={() => handleAddToCart(product)}
              >
                <AddShoppingCartIcon />
              </IconButton>
              <IconButton
                sx={{ border: "solid 0.5px", margin: "2px" }}
                color="error"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                sx={{ border: "solid 0.5px", margin: "2px" }}
                color="primary"
                aria-label="view content"
              >
                <ViewHeadlineIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default ProductsGrid;
