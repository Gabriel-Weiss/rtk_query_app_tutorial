import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
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
import { useDeleteRestaurantMutation } from "../../redux/restaurants/restaurantsApiSlice";

const RestaurantsCard = ({ restaurant }) => {
  const [deleteRestaurant] = useDeleteRestaurantMutation();
  const { isAdmin } = useAuthentication();
  const navigate = useNavigate();

  const handleDeleteResturant = async (id) => {
    await deleteRestaurant(id).unwrap();
  };

  return (
    <Card>
      <Box
        sx={{ display: "flex", flexDirection: "row" }}
        onClick={() => navigate(`/restaurants/${restaurant._id}`)}
      >
        <CardMedia
          component="img"
          sx={{ width: 1 / 2 }}
          image={logo}
          alt="logo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {restaurant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.format_cuisines}
          </Typography>
          <Typography>
            Price level: {handlePriceLevel(restaurant.price_level)}
          </Typography>
          {restaurant.ratings ? (
            <Stack direction="row">
              <Typography color="secondary" component="legend">
                Rating:
              </Typography>
              <Rating value={restaurant.ratings.average} readOnly />
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
          onClick={() => handleDeleteResturant(restaurant._id)}
        >
          Delete
        </Button>
      )}
    </Card>
  );
};

export default RestaurantsCard;
