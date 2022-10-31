import Box from "@mui/material/Box";
import MarketsCard from "./MarketsCard";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import useAuthentication from "../../hooks/useAuthentication";
import { useGetMarketsQuery } from "../../redux/markets/marketsApiSlice";

const MarketsGrid = () => {
  const { data = [], isLoading, isSuccess } = useGetMarketsQuery();
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
              onClick={() => navigate("/markets/add")}
            >
              Add Market
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
          {filteredData.map((market) => (
            <MarketsCard key={market._id} market={market} />
          ))}
        </Box>
      </>
    ));

  return content;
};

export default MarketsGrid;
