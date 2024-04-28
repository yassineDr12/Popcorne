import React from "react";
import { Card, CardContent, Typography, Rating, Button, Grid, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { IPersonalRatingProps } from "../dataTypes";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MyAnimatedComponent from "./MyAnimatedComponent";

export const PersonalRating: React.FC<IPersonalRatingProps> = ({ selectedMovie, setSelectedMovie, handleAddMovie }) => {
  const [ratingValue, setRatingValue] = React.useState<number>(0);

  return (
    <MyAnimatedComponent>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <img
            src={selectedMovie?.Poster}
            alt={selectedMovie?.Title}
            style={{ marginRight: "10px", width: "150", height: "375px" }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                {selectedMovie?.Title}
              </Typography>
              <IconButton aria-label="close" size="large" onClick={() => setSelectedMovie(undefined)}>
                <HighlightOffIcon fontSize="inherit" />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {selectedMovie?.Year} - {selectedMovie?.Length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedMovie?.Genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⭐ {selectedMovie?.imdbRating} IMDb rating
            </Typography>
          </CardContent>
          <Card
            sx={{
              width: "400px",
              borderRadius: 1,
              margin: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Rating
                name="simple-controlled"
                value={ratingValue}
                max={10}
                onChange={(event, newValue) => {
                  setRatingValue(Number(newValue));
                }}
                sx={{ mb: 2, mt: 2 }}
              />
              <Button
                variant="contained"
                endIcon={<AddIcon />}
                fullWidth
                sx={{ mb: 2 }}
                onClick={() => selectedMovie && handleAddMovie(selectedMovie, ratingValue)}
              >
                Add to list
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {selectedMovie?.Plot}
        </Typography>
      </CardContent>
    </MyAnimatedComponent>
  );
};

export default PersonalRating;
