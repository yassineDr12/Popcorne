import React from "react";
import { ListItem, Divider, ListItemText, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import { IWatchedListProps } from "../dataTypes";

const WatchedList: React.FC<IWatchedListProps> = ({ watchedList }) => {
  const summary = {
    movies: 3,
    averageRating: 7.65,
    personalRating: 8.79,
    watchTime: 284,
  };

  return watchedList.length ? (
    <>
      <AccordionSummary>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography variant="h6" gutterBottom>
            MOVIES YOU WATCHED
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`🎬${summary.movies} movie${summary.movies !== 1 ? "s" : ""}`}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`🌟${summary.personalRating}`}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`⭐ ${summary.averageRating}`}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`⌛ ${summary.watchTime} min`}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {watchedList?.map((movie, index) => (
          <React.Fragment key={movie.imdbID}>
            <ListItem alignItems="flex-start">
              <img src={movie.Poster} alt={movie.Title} style={{ marginRight: "10px", width: "50", height: "125px" }} />
              <ListItemText primary={movie.Title} secondary={movie.Year} />
            </ListItem>
            {index !== watchedList.length - 1 && <Divider sx={{ margin: "8px 0" }} />}
          </React.Fragment>
        ))}
      </AccordionDetails>
    </>
  ) : null;
};

export default WatchedList;
