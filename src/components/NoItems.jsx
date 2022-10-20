import { Paper } from "@mui/material";
import React from "react";

const NoItems = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
        marginTop: "5px",
        height: "40vh",
      }}
    >
      No itmes found
    </Paper>
  );
};

export default NoItems;
