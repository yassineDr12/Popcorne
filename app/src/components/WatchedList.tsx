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
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWatchedListProps } from "../dataTypes";

const WatchedList: React.FC<IWatchedListProps> = ({ watchedList }) => {
  const summary = {
    movies: 3,
    averageRating: 7.65,
    watchTime: 284,
  };

  return watchedList.length ? (
    <Grid item xs={4}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="h6" gutterBottom>
              MOVIES YOU WATCHED
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1 }}>
                {`🎬${summary.movies} movie${summary.movies !== 1 ? "s" : ""}`}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "center" }}>
                {`⭐ ${summary.averageRating}`}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom sx={{ flexGrow: 1, textAlign: "right" }}>
                {`⌛ ${summary.watchTime} min`}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {watchedList?.map((movie, index) => (
            <React.Fragment key={movie.imdbID}>
              <ListItem alignItems="flex-start">
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{ marginRight: "10px", width: "50", height: "125px" }}
                />
                <ListItemText primary={movie.Title} secondary={movie.Year} />
              </ListItem>
              {index !== watchedList.length - 1 && <Divider sx={{ margin: "8px 0" }} />}
            </React.Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  ) : null;
};

export default WatchedList;
