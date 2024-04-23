import React from "react";
import { IBodyProps, IMovie } from "../dataTypes";
import { Box, Grid } from "@mui/material";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";

const Body: React.FC<IBodyProps> = ({ searchResults }) => {
  let watchedList: IMovie[] = [];
  if (searchResults?.length > 1) {
    watchedList = [searchResults[0], searchResults[1]];
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <MovieList searchResults={searchResults} />
        <WatchedList watchedList={watchedList} />
      </Grid>
    </Box>
  );
};

export default Body;
