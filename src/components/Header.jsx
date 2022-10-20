import React from "react";
import "./css/Header.css";
import { MdOutlineNoFood } from "react-icons/md";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../redux/auth/authApiSlice";
import useAuthentication from "../hooks/useAuthentication";
import { getCartQuantity } from "../redux/cart/cartSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { isVisitor } = useAuthentication();
  const { quantity } = useSelector((state) => state.cart);

  return (
    <div className="header_container">
      <div className="list-item-right">
        <div className="header_icon">
          <MdOutlineNoFood />
        </div>
        <Link className="list_item" to={`/restaurants`}>
          Restaurante
        </Link>
        <Link className="list_item" to={`/markets`}>
          Magazine
        </Link>
      </div>
      <ul className="header_nav">
        <Link className="list_item" to={"/"}>
          Home
        </Link>
        <Link className="list_item" to={"/"}>
          News
        </Link>
        <Link
          className="list_item"
          to={"/cart"}
          style={{ padding: "6px 25px 14px 25px" }}
        >
          {dispatch(getCartQuantity()) ? (
            <Badge color="secondary" badgeContent={quantity} max={999}>
              <ShoppingCartIcon />
            </Badge>
          ) : (
            <ShoppingCartIcon />
          )}
        </Link>
        {!isVisitor ? (
          <AuthButton handleClick={logout} text={"Logout"} />
        ) : (
          <AuthButton
            handleClick={() => navigate("/login")}
            text={"Login/Register"}
          />
        )}
      </ul>
    </div>
  );
};

export default Header;
