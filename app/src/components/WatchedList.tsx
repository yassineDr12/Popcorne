import React, { useState } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IWatchedListProps } from "../dataTypes";

const WatchedList: React.FC<IWatchedListProps> = ({ watchedList }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return watchedList.length ? (
    <Grid item xs={4}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          Watched List
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
              {index !== watchedList.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </AccordionDetails>
      </Accordion>
    </Grid>
  ) : null;
};

export default WatchedList;
