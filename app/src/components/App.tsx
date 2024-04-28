import { createContext, useContext, useMemo } from "react";
import IconButton from "@mui/material/IconButton";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Body from "./Body";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { IMovie } from "../dataTypes";
import axios from "axios";
import { CssBaseline } from "@mui/material";

const fetchMovieData = async (searchQuery: string | undefined) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=dbc2c0f9`);
    const movieList = response.data.Search;

    if (!movieList) {
      return [];
    }

    const detailedMovieList: IMovie[] = await Promise.all(
      movieList.map(async (movie: IMovie) => {
        const response = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=dbc2c0f9`);
        const movieData = response.data;

        return {
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
      })
    );

    return detailedMovieList;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return [];
  }
};

const ColorModeContext = createContext({ App: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [movieSearchLoading, setMovieSearchLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        setMovieSearchLoading(true);
        const data = await fetchMovieData(searchQuery);
        setSearchResults(data);
        setMovieSearchLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        searchResults={searchResults}
        movieSearchLoading={movieSearchLoading}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setMovieSearchLoading={setMovieSearchLoading}
      >
        <IconButton sx={{ ml: 1 }} onClick={colorMode.App} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Navbar>
      <Body
        searchResults={searchResults}
        movieSearchLoading={movieSearchLoading}
        setMovieSearchLoading={setMovieSearchLoading}
      />
    </>
  );
}

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const colorMode = useMemo(
    () => ({
      App: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
