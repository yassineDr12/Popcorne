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

function App() {
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
      ></Navbar>
      <Body searchResults={searchResults} isLoading={isLoading} />
    </>
  );
}

export default App;
