import React from "react";
import "./css/NotFound.css";

const NotFound = () => {
  return (
    <div className="mainContainer">
      <div className="secondaryContainer">NotFound !!!</div>
      <hr className="contentSeparator" />
      <div className="innerContentContainer">
        <p className="mainParagraph">
          <i>This page does not exists.</i>
        </p>
        <p className="secondaryParagraph">
          <i>Please return to previous page.</i>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
