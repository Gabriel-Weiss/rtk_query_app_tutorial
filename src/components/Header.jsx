import React from "react";
import "./css/Header.css";
import { MdOutlineNoFood } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../redux/auth/authSlice";
import AuthButton from "./AuthButton";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const handleLogOut = () => {
    dispatch(logOut());
  };

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
        {user ? (
          <AuthButton handleClick={handleLogOut} text={"Logout"} />
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
