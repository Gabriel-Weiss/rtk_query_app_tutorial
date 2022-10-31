import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography
        variant="h2"
        color="secondary.main"
        sx={{ fontWeight: "bold" }}
      >
        NotFound !!!
      </Typography>
      <hr className="contentSeparator" />
      <Container>
        <Typography variant="h4" color="secondary.light" fontStyle="oblique">
          This page does not exists.
        </Typography>
        <Typography variant="h4" color="secondary.light" fontStyle="oblique">
          Please return to previous page.
        </Typography>
      </Container>
    </Container>
  );
};

export default NotFound;
