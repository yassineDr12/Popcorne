import React from "react";
import { Divider, CircularProgress, Box, ListItem, ListItemText, ButtonBase } from "@mui/material";
import { IMovieListProps } from "../dataTypes";

const MovieList: React.FC<IMovieListProps> = ({ searchResults, movieSearchLoading, handleMovieClick }) => {
  return movieSearchLoading ? (
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
      {searchResults?.map((movie, index) => (
        <React.Fragment key={index}>
          <ButtonBase
            sx={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
              textTransform: "none",
            }}
            onClick={() => handleMovieClick(movie)}
          >
            <ListItem alignItems="flex-start">
              <img src={movie.Poster} alt={movie.Title} style={{ marginRight: "10px", width: "50", height: "125px" }} />
              <ListItemText primary={movie.Title} secondary={movie.Year} />
            </ListItem>
          </ButtonBase>
          {index !== searchResults.length - 1 && <Divider sx={{ margin: "8px 0" }} />}
        </React.Fragment>
      ))}
    </>
  );
};

export default MovieList;
