import React from "react";
import { ListItem, Divider, ListItemText, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";
import { IMovie, IWatchedListProps } from "../dataTypes";

function calculateTotalDuration(watchedList: IMovie[]): string {
  const durations = watchedList.map((movie) => movie.Length!);
  const totalMinutes = durations.reduce((acc, duration) => {
    const [minutes] = duration.split(" ").map(Number);
    return acc + minutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}min`;
}

const WatchedList: React.FC<IWatchedListProps> = ({ watchedList, watchedListRating }) => {
  let summary;

  if (watchedList.length > 0) {
    summary = {
      movies: watchedList.length,
      averageRating: (
        watchedList.map((movie) => movie.imdbRating!).reduce((acc, rating) => acc + rating) / watchedList.length
      ).toFixed(2),
      watchTime: calculateTotalDuration(watchedList),
    };
  }

  return watchedList.length ? (
    <>
      <AccordionSummary>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography variant="h6" gutterBottom sx={{ textAlign: "center", marginTop: 6 }}>
            MOVIES YOU WATCHED
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`🎬${summary?.movies} movie${summary?.movies !== 1 ? "s" : ""}`}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`🌟${watchedListRating}`}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`⭐ ${summary?.averageRating}`}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
              {`⌛ ${summary?.watchTime}`}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ marginTop: 4 }}>
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
