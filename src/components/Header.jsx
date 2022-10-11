import React from "react";
import "./css/Header.css";
import { MdOutlineNoFood } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import { useLogoutMutation } from "../redux/auth/authApiSlice";
import useAuthentication from "../hooks/useAuthentication";

const Header = () => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { isVisitor } = useAuthentication();

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
        <Link className="list_item" to={"/"}>
          Contact
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
