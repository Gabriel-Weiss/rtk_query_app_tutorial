import React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "./ButtonComponent";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { getCartQuantity } from "../redux/cart/cartSlice";
import useAuthentication from "../hooks/useAuthentication";
import { useLogoutMutation } from "../redux/auth/authApiSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NoFoodOutlinedIcon from "@mui/icons-material/NoFoodOutlined";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { isVisitor } = useAuthentication();
  const { quantity } = useSelector((state) => state.cart);

  return (
    <AppBar color="inherit" position="relative">
      <Toolbar
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton color="secondary">
            <NoFoodOutlinedIcon fontSize="large" />
          </IconButton>
          <ButtonGroup
            color="secondary"
            disableElevation
            variant="contained"
            aria-label="toggel between restaurants and markets"
          >
            <Button variant="text" onClick={() => navigate("/restaurants")}>
              Restaurante
            </Button>
            <Button variant="text" onClick={() => navigate("/markets")}>
              Magazine
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ButtonGroup
            color="secondary"
            disableElevation
            variant="contained"
            aria-label="toggel between restaurants and markets"
          >
            <Button variant="text" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="text" onClick={() => navigate("/")}>
              News
            </Button>
            <Button variant="text" onClick={() => navigate("/cart")}>
              {dispatch(getCartQuantity()) ? (
                <Badge color="secondary" badgeContent={quantity} max={999}>
                  <ShoppingCartIcon />
                </Badge>
              ) : (
                <ShoppingCartIcon />
              )}
            </Button>
          </ButtonGroup>
          {!isVisitor ? (
            <ButtonComponent handleClick={logout} text={"Logout"} />
          ) : (
            <ButtonComponent
              handleClick={() => navigate("/login")}
              text={"Login/Register"}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
