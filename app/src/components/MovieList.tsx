import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Movie } from "../dataTypes";

interface MovieListProps {
  searchResults: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ searchResults }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {searchResults?.map((movie) => (
        <>
          <ListItem alignItems="flex-start" key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} style={{ marginRight: "10px", width: "50", height: "125px" }} />
            <ListItemText primary={movie.Title} secondary={movie.Year} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
};
export default MovieList;
