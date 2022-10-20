import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "10em",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

export default Spinner;
