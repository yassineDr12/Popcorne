import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Movie } from "../dataTypes";
import MovieList from "./MovieList";
import { Box, Grid, Paper, styled } from "@mui/material";
import AlignItemsList from "./Scratch";

const fetchMovieData = async (movieTitle: string | undefined) => {
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${movieTitle}&apikey=dbc2c0f9`);
    var data = response.data.Search;
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

function App() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        setIsLoading(true);
        const data = await fetchMovieData(searchQuery);
        setSearchResults(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(event.currentTarget.value);
    }
  };

  return (
    <>
      <Navbar onKeyDown={handleSearch}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>{searchResults?.length > 0 ? `${searchResults.length} results found` : "No results found"}</div>
        )}
      </Navbar>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={4}>
            <MovieList searchResults={searchResults} />
          </Grid>
          <Grid item xs={4}>
            to implement
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
