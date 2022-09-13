import React from "react";
import "./css/AddButton.css";

const AddButton = ({ handleClick }) => {
  return (
    <button className="add-btn" onClick={handleClick}>
      Add Item
    </button>
  );
};

export default AddButton;
