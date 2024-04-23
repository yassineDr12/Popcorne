import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import popcornIcon from "../icons/popcorn-icon.png";
import { useEffect } from "react";
import axios from "axios";
import { INavbarProps } from "../dataTypes";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: theme.spacing(1),
}));

const fetchMovieData = async (searchQuery: string | undefined) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=dbc2c0f9`);
    var data = response.data.Search;
    return data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

const Navbar: React.FC<INavbarProps> = ({
  searchQuery,
  searchResults,
  isLoading,
  setSearchQuery,
  setSearchResults,
  setIsLoading,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        setIsLoading(true);
        const data = await fetchMovieData(searchQuery);
        setSearchResults(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, setIsLoading, setSearchResults]);

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(event.currentTarget.value);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={popcornIcon} alt="Popcorn Icon" style={{ width: 32, height: 32, marginRight: 8 }} />
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
              Popcorn
            </Typography>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onKeyDown={handleSearch}
              placeholder="Search movies…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Typography variant="caption">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>{searchResults?.length > 0 ? `${searchResults.length} results found` : "No results found"}</div>
            )}
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Navbar;
