import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography
        variant="h2"
        color="secondary.main"
        sx={{ fontWeight: "bold" }}
      >
        Content
      </Typography>
      <Container>
        <Typography variant="h4" color="secondary.light" fontStyle="oblique">
          To be added
        </Typography>
      </Container>
    </Container>
  );
};

export default Home;
