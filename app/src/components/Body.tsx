import React from "react";
import { IBodyProps, IMovie } from "../dataTypes";
import { Box, CircularProgress, Grid } from "@mui/material";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";

const Body: React.FC<IBodyProps> = ({ searchResults, isLoading }) => {
  let watchedList: IMovie[] = [];
  if (searchResults?.length > 1) {
    watchedList = [searchResults[0], searchResults[1]];
  }

  return (
    <Box
      sx={{
        marginTop: 2,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh", // Set height of the container to full viewport height
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <MovieList searchResults={searchResults} />
            <WatchedList watchedList={watchedList} />
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Body;
