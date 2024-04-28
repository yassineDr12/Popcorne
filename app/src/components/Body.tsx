import React, { useEffect, useState } from "react";
import { IBodyProps, IMovie } from "../dataTypes";
import { Grid } from "@mui/material";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";
import StyledCard from "./StyledCard";
import PersonalRating from "./PersonalRating";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const Body: React.FC<IBodyProps> = ({ searchResults, movieSearchLoading }) => {
  const [watchedList, setWatchedList] = useState<IMovie[]>([]);
  const [watchedListRating, setWatchedListRating] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>(undefined);
  const [snackbar, setSnackbar] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState("second");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "warning" | "info" | "error" | undefined>(undefined);

  const handleSnackbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    setSnackbar(false);
  };

  useEffect(() => {
    setAlertSeverity("success");
    setSnackbarMessage("Saved to Watch List!");
    setSnackbar((prev) => !prev);
    setSelectedMovie(undefined);
  }, [watchedList]);

  const handleMovieClick = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  const handleAddMovie = (movie: IMovie, ratingValue: number) => {
    // Check if the movie already exists in watchedList
    if (!watchedList.some((m) => m.imdbID === movie.imdbID)) {
      // Calculate the new average rating
      const newRating = watchedListRating ? (watchedListRating + ratingValue) / 2 : ratingValue;

      // Update watchedListRating and watchedList
      setWatchedListRating(newRating);
      setWatchedList((prevWatchedList) => [...prevWatchedList, movie]);
    } else {
      // Movie already exists in the list
      setAlertSeverity("warning");
      setSnackbarMessage("Already in the Watch List!");
      setSnackbar(true);
    }
  };

  return (
    <Grid container spacing={2} marginTop={1} justifyContent="center">
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message=""
      >
        <Alert onClose={handleSnackbarClose} severity={alertSeverity} variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <StyledCard>
        <MovieList
          searchResults={searchResults}
          movieSearchLoading={movieSearchLoading}
          handleMovieClick={handleMovieClick}
        />
      </StyledCard>
      <StyledCard>
        {!selectedMovie ? (
          <WatchedList watchedList={watchedList} watchedListRating={watchedListRating} />
        ) : (
          <PersonalRating
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
            handleAddMovie={handleAddMovie}
          />
        )}
      </StyledCard>
    </Grid>
  );
};

export default Body;
