import React, { Dispatch, SetStateAction } from "react";

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string[] | undefined;
  Plot: string | undefined;
  Length: string | undefined;
  imdbRating: number | undefined;
}

export interface IMovieListProps {
  searchResults: IMovie[];
  movieSearchLoading: boolean;
  handleMovieClick: (movie: IMovie) => void;
}

export interface IBodyProps {
  searchResults: IMovie[];
  movieSearchLoading: boolean;
  setMovieSearchLoading: Dispatch<SetStateAction<boolean>>;
}
export interface INavbarProps {
  searchQuery: string | undefined;
  searchResults: IMovie[];
  movieSearchLoading: boolean;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
  setSearchResults: Dispatch<SetStateAction<IMovie[]>>;
  setMovieSearchLoading: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

export interface IWatchedListProps {
  watchedList: IMovie[];
  watchedListRating: number;
}

export interface IStyledCardProps {
  children: React.ReactNode;
}

export interface IPersonalRatingProps {
  selectedMovie: IMovie | undefined;
  movieDetailLoading: boolean;
  setSelectedMovie: Dispatch<React.SetStateAction<IMovie | undefined>>;
  handleAddMovie: (movie: IMovie, ratingValue: number) => void;
}
