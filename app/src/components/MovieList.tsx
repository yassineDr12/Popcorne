import React from "react";
import {
  ListItem,
  Divider,
  ListItemText,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { IMovieListProps } from "../dataTypes";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MovieList: React.FC<IMovieListProps> = ({ searchResults }) => {
  return searchResults?.length ? (
    <Grid item xs={4}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6" gutterBottom>
            SEARCH RESULTS
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            height: "75vh", // Set the fixed height of the AccordionDetails
            overflowY: "auto", // Make the content scrollable if it exceeds the fixed height
            "&::-webkit-scrollbar": {
              width: "0 !important", // Hide the scrollbar in WebKit browsers
            },
          }}
        >
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
              {index !== searchResults.length - 1 && <Divider sx={{ margin: "8px 0" }} />}
            </React.Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  ) : null;
};
export default MovieList;
