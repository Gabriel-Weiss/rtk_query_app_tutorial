import React from "react";

const NotFound = () => {
  return (
    <div
      style={{
        marginTop: "2rem",
        marginLeft: "2rem",
        marginRight: "1rem",
        height: "100vh",
      }}
    >
      <div
        style={{
          fontSize: "4rem",
        }}
      >
        NotFound !!!
      </div>
      <hr
        style={{
          height: "3px",
          background: "black",
        }}
      />
      <div
        style={{
          marginLeft: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "2rem",
            marginBottom: "0",
            paddingBottom: "0",
          }}
        >
          <i>This page does not exists.</i>
        </p>
        <p
          style={{
            fontSize: "2rem",
            marginTop: "0",
            paddingTop: "0",
          }}
        >
          <i>Please return to previous page.</i>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
