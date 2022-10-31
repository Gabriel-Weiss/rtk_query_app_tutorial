import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)({
  width: "fit-content",
  background: "transparent",
  color: "#6643be",
  fontSize: ".7 rem",
  padding: "12px 18px",
  transition: "0.5s",
  border: "none",
  "&:hover": {
    background: "rgb(153, 51, 255)",
    color: "var(--textColor)",
    boxShadow: "0 0 35px #6643be",
    borderRadius: "3px",
  },
});

const ButtonComponent = ({ handleClick, text }) => {
  return <CustomButton onClick={handleClick}>{text}</CustomButton>;
};

export default ButtonComponent;
