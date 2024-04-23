import Body from "./Body";
import { useState } from "react";
import Navbar from "./Navbar";
import { IMovie } from "../dataTypes";
// import AlignItemsList from "./Scratch";

function App() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <Body searchResults={searchResults} />
    </>
  );
}

export default App;
