import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import logo from "../../static/images/logo.png";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { handlePriceLevel } from "../../utils/functions";
import useAuthentication from "../../hooks/useAuthentication";
import { useDeleteMarketMutation } from "../../redux/markets/marketsApiSlice";

const MarketsCard = ({ market }) => {
  const [deleteMarket] = useDeleteMarketMutation();
  const { isAdmin } = useAuthentication();
  const navigate = useNavigate();

  const handleDeleteMarket = async (id) => {
    await deleteMarket(id).unwrap();
  };

  return (
    <Card>
      <Box
        sx={{ display: "flex", flexDirection: "row" }}
        onClick={() => navigate(`/markets/${market._id}`)}
      >
        <CardMedia
          component="img"
          sx={{ width: 1 / 2 }}
          image={logo}
          alt="logo"
        />

        <CardContent>
          <Typography gutterBottom variant="h5">
            {market.name}
          </Typography>
          <Typography variant="body2">
            Price level: {handlePriceLevel(market.price_level)}
          </Typography>
          <Typography>Products: {market.format_cuisines}</Typography>
          {market.ratings ? (
            <Stack direction="row">
              <Typography color="secondary" component="legend">
                Rating:
              </Typography>
              <Rating value={market.ratings.average} readOnly />
            </Stack>
          ) : (
            <Typography color="secondary" component="legend">
              Rating: no rating
            </Typography>
          )}
        </CardContent>
      </Box>
      {isAdmin && (
        <Button
          fullWidth
          size="small"
          color="error"
          variant="outlined"
          onClick={() => handleDeleteMarket(market._id)}
        >
          Delete
        </Button>
      )}
    </Card>
  );
};

export default MarketsCard;
