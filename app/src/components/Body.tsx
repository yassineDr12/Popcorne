import React, { useState } from "react";
import { IBodyProps, IMovie } from "../dataTypes";
import { Box, CircularProgress, Grid } from "@mui/material";
import MovieList from "./MovieList";
import WatchedList from "./WatchedList";
import StyledCard from "./StyledCard";
import PersonalRating from "./PersonalRating";
import axios from "axios";

const getMovieDetails = async (imdbID: string) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=dbc2c0f9`);
    const movieData = response.data;

    const movie: IMovie = {
      Title: movieData.Title,
      Year: movieData.Year,
      imdbID: movieData.imdbID,
      Type: movieData.Type,
      Poster: movieData.Poster,
      Genre: movieData.Genre,
      Plot: movieData.Plot,
      Length: movieData.Runtime, // Assuming Runtime represents movie length
      imdbRating: parseFloat(movieData.imdbRating), // Convert imdbRating to number
    };

    return movie;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

const Body: React.FC<IBodyProps> = ({ searchResults, movieSearchLoading }) => {
  const [watchedList, setWatchedList] = useState<IMovie[]>([]);
  const [watchedListRating, setWatchedListRating] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>(undefined);
  const [movieDetailLoading, setMovieDetailLoading] = useState(false);

  const handleMovieClick = async (movie: IMovie) => {
    setMovieDetailLoading(true);
    const detailedMovie = await getMovieDetails(movie.imdbID);
    setSelectedMovie(detailedMovie);
    setMovieDetailLoading(false);
  };

  const handleAddMovie = (movie: IMovie, ratingValue: number) => {
    watchedListRating ? setWatchedListRating((prev) => (prev + ratingValue) / 2) : setWatchedListRating(ratingValue);
    setWatchedList((prevWatchedList) => [...prevWatchedList, movie]);
  };

  return (
    <Grid container spacing={2} marginTop={1} justifyContent="center">
      <StyledCard>
        <MovieList
          searchResults={searchResults}
          movieSearchLoading={movieSearchLoading}
          handleMovieClick={handleMovieClick}
        />
      </StyledCard>
      <StyledCard>
        {movieDetailLoading ? (
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
        ) : !selectedMovie ? (
          <WatchedList watchedList={watchedList} watchedListRating={watchedListRating} />
        ) : (
          <PersonalRating
            selectedMovie={selectedMovie}
            movieDetailLoading={movieDetailLoading}
            setSelectedMovie={setSelectedMovie}
            handleAddMovie={handleAddMovie}
          />
        )}
      </StyledCard>
    </Grid>
  );
};

export default Body;
