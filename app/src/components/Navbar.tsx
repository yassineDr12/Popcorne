import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import popcornIcon from "../icons/popcorn-icon.png";
import { ReactNode } from "react";

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

// Add border-radius to the AppBar component
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: theme.spacing(1),
}));

export default function Navbar({
  onKeyDown,
  children,
}: {
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  children: ReactNode;
}) {
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
              onKeyDown={onKeyDown}
              placeholder="Search movies…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Typography variant="caption">{children}</Typography>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
