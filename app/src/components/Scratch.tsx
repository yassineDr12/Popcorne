import React, { useState } from "react";
import { List, ListItem, Divider, ListItemText, Grid, Button } from "@mui/material";
import { IWatchedListProps } from "../dataTypes";

const WatchedList: React.FC<IWatchedListProps> = ({ watchedList }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return watchedList.length ? (
    <Grid item xs={4} md={4}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#e3f2fd", borderRadius: 1 }}>
        {watchedList?.map((movie) => (
          <React.Fragment key={movie.imdbID}>
            <ListItem alignItems="flex-start">
              <img src={movie.Poster} alt={movie.Title} style={{ marginRight: "10px", width: "50", height: "125px" }} />
              <ListItemText primary={movie.Title} secondary={movie.Year} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Grid>
  ) : null;
};

export default WatchedList;
