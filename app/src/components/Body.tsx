import React, { useEffect, useState } from "react";
import { IBodyProps, IMovie } from "../dataTypes";
import { Grid } from "@mui/material";
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
  const [selectedMovie, setSelectedMovie] = useState<IMovie | undefined>(undefined);
  const [movieDetailLoading, setMovieDetailLoading] = useState(false);
  const [rightCard, setRightCard] = useState("WatchedList");

  useEffect(() => {
    if (searchResults?.length > 1) {
      setWatchedList([searchResults[0], searchResults[1]]);
    }
  }, [searchResults]);

  useEffect(() => {
    selectedMovie ? setRightCard("PersonalRating") : setRightCard("WatchedList");
  }, [selectedMovie]);

  const handleMovieClick = async (movie: IMovie) => {
    setMovieDetailLoading(true);
    const detailedMovie = await getMovieDetails(movie.imdbID);
    setSelectedMovie(detailedMovie);
    setMovieDetailLoading(false);
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
        {rightCard === "WatchedList" ? (
          <WatchedList watchedList={watchedList} />
        ) : (
          <PersonalRating
            selectedMovie={selectedMovie}
            movieDetailLoading={movieDetailLoading}
            setSelectedMovie={setSelectedMovie}
          />
        )}
      </StyledCard>
    </Grid>
  );
};

export default Body;
