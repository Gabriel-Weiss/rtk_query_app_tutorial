import Box from "@mui/material/Box";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import RestaurantsCard from "./RestaurantsCard";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import useAuthentication from "../../hooks/useAuthentication";
import { useGetRestaurantsQuery } from "../../redux/restaurants/restaurantsApiSlice";

export default function RestaurantsGrid() {
  const { data = [], isLoading, isSuccess } = useGetRestaurantsQuery();
  const { isAdmin } = useAuthentication();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const filteredData = search.length
    ? data.filter((market) => market.name.toLowerCase().includes(search))
    : data;

  let content;
  isLoading && (content = <Spinner />);
  isSuccess &&
    (content = (
      <>
        <Box
          display="flex"
          position="sticky"
          flexWrap="wrap"
          flexDirection="row"
          justifyContent="center"
          alignContent="center"
          top={0}
          bgcolor={"grey.200"}
          borderTop={3}
          borderBottom={3}
          paddingY={0.6}
          paddingX={0}
        >
          <Box mr={2}>
            <OutlinedInput
              type="text"
              size="small"
              autoFocus={true}
              fullWidth
              placeholder="Search"
              value={search}
              onChange={inputHandler}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              }
            />
          </Box>
          {isAdmin && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => navigate("/restaurants/add")}
            >
              Add Restaurant
            </Button>
          )}
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill,minmax(400px, 1fr))"
          gridTemplateRows="auto"
          gap={2}
          padding={1}
        >
          {filteredData.map((restaurant) => (
            <RestaurantsCard key={restaurant._id} restaurant={restaurant} />
          ))}
        </Box>
      </>
    ));

  return content;
}
