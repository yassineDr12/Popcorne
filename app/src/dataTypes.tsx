import { Dispatch, SetStateAction } from "react";

export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovieListProps {
  searchResults: IMovie[];
}

export interface IBodyProps {
  searchResults: IMovie[];
}
export interface INavbarProps {
  searchQuery: string | undefined;
  searchResults: IMovie[];
  isLoading: boolean;
  setSearchQuery: Dispatch<SetStateAction<string | undefined>>;
  setSearchResults: Dispatch<SetStateAction<IMovie[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface IWatchedListProps {
  watchedList: IMovie[];
}
