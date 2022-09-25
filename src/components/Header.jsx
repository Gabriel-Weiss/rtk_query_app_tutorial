import React from "react";
import "./css/Header.css";
import { MdOutlineNoFood } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectUser } from "../redux/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
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
          <button className="list_item logout-btn" onClick={handleLogOut}>
            Logout
          </button>
        ) : (
          <Link className="list_item" to={"/login"}>
            Login
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Header;
