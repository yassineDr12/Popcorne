///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
// import AlignItemsList from "./Scratch";

const fetchMovieData = async (searchQuery: string | undefined) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=dbc2c0f9`);
    const data = response.data.Search;
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

const ColorModeContext = createContext({ App: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
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
  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        searchResults={searchResults}
        isLoading={isLoading}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setIsLoading={setIsLoading}
      >
        <IconButton sx={{ ml: 1 }} onClick={colorMode.App} color="inherit">
          {theme.palette.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Navbar>
      <Body searchResults={searchResults} isLoading={isLoading} />
    </>
  );
}

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
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
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
