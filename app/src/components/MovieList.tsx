import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { IMovieListProps } from "../dataTypes";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MovieList: React.FC<IMovieListProps> = ({ searchResults }) => {
  return searchResults.length ? (
    <Grid item xs={4}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          Watched List
        </AccordionSummary>
        <AccordionDetails>
          {searchResults?.map((movie, index) => (
            <React.Fragment key={movie.imdbID}>
              <ListItem alignItems="flex-start">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ marginRight: "10px", width: "50", height: "125px" }}
                />
                <ListItemText primary={movie.Title} secondary={movie.Year} />
              </ListItem>
              {index !== searchResults.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  ) : null;
};
export default MovieList;
