/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from "axios";

const fetchMovieData = async (searchQuery: string | undefined) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=dbc2c0f9`);
    const data = response.data.Search;
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

const data = fetchMovieData("heart break");
data;
