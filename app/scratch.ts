import axios from "axios";

const fetchMovieData = async () => {
  const movieTitle = "inception";

  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${movieTitle}&apikey=dbc2c0f9`);
    var data = response.data.Search;
    data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

fetchMovieData();
