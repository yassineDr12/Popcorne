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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWatchedListProps } from "../dataTypes";

const WatchedList: React.FC<IWatchedListProps> = ({ watchedList }) => {
  return watchedList.length ? (
    <Grid item xs={4}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6" gutterBottom>
            Watched List
          </Typography>
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
