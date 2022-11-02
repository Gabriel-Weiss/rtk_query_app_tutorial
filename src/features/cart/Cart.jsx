import React from "react";
import {
  addToCart,
  decreaseCartQty,
  removeFromCart,
  clearCart,
} from "../../redux/cart/cartSlice";
import { toast } from "react-toastify";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import StripeContainer from "../payments/stripe/StripeContainer";

const Cart = () => {
  const TAX_RATE = 0.07;
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (item) => dispatch(removeFromCart(item));
  const handleIncreaseCartQty = (item) => dispatch(addToCart(item));
  const handleDecreseCartQty = (item) => dispatch(decreaseCartQty(item));
  const handleClearCart = () => {
    toast.info("Cart cleared successfully!!!");
    dispatch(clearCart());
    navigate("/");
  };
  const ccyFormat = (num) => `${num.toFixed(2)}`;
  const priceRow = (qty, unit) => qty * unit;
  const subtotal = (items) =>
    items
      .map(({ cartQty, price }) => priceRow(cartQty, price))
      .reduce((sum, i) => sum + i, 0);

  const invoiceSubtotal = subtotal(cart);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

  let tableBody;
  cart.length === 0
    ? (tableBody = (
        <TableRow>
          <TableCell align="center" colSpan={5}>
            No items selected!!!
          </TableCell>
        </TableRow>
      ))
    : (tableBody = cart?.map((item) => (
        <TableRow key={item._id}>
          <TableCell>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleRemoveFromCart(item)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell align="right">
            <IconButton
              aria-label="decrease item's quantity"
              onClick={() => handleDecreseCartQty(item)}
            >
              <RemoveOutlinedIcon />
            </IconButton>
            {item.cartQty}
            <IconButton
              aria-label="increase item's quantity"
              onClick={() => handleIncreaseCartQty(item)}
            >
              <AddOutlinedIcon />
            </IconButton>
          </TableCell>
          <TableCell align="right">{ccyFormat(item.price)}</TableCell>
          <TableCell align="right">
            {priceRow(item.cartQty, item.price)}
          </TableCell>
        </TableRow>
      )));

  return (
    <Container
      maxWidth="lg"
      spacing={10}
      sx={{ mt: "20px", display: { xs: "block", md: "flex" } }}
    >
      <TableContainer component={Paper} sx={{ mr: "5px" }}>
        <Table sx={{ minWidth: 500 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={3}
                sx={{ color: "secondary.main" }}
              >
                Detalii
              </TableCell>
              <TableCell align="center" sx={{ color: "secondary.main" }}>
                Costuri
              </TableCell>
            </TableRow>
            <TableRow sx={{ bgcolor: "secondary.main" }}>
              <TableCell align="center" colSpan={2}>
                Desc
              </TableCell>
              <TableCell align="center">Cant.</TableCell>
              <TableCell align="right">Pret/buc.</TableCell>
              <TableCell align="right">Suma</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody}
            <TableRow>
              <TableCell align="center" rowSpan={3} colSpan={2}>
                <Button
                  variant="outlined"
                  startIcon={<RemoveShoppingCartIcon />}
                  size="medium"
                  color="primary"
                  onClick={() => handleClearCart()}
                >
                  Clear
                </Button>
              </TableCell>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Taxe</TableCell>
              <TableCell align="right" colSpan={1}>
                {`${(TAX_RATE * 100).toFixed(0)} %`}
              </TableCell>
              <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <StripeContainer amount={invoiceTotal} />
    </Container>
  );
};

export default Cart;
