import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getTrendingMovies,
  getUpcomingMovies,
  getTopRatedMovies,
  popularMovies,
} from "../API/movies";
import { Movie, PaginatedResponse } from "../types/movie";

interface MoviesContextType {
  trending: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadMovies = async (): Promise<void> => {
    try {
      setLoading(true);

      const [trendingRes, upcomingRes, topRatedRes, popularRes]: [
        PaginatedResponse<Movie>,
        PaginatedResponse<Movie>,
        PaginatedResponse<Movie>,
        PaginatedResponse<Movie>,
      ] = await Promise.all([
        getTrendingMovies(),
        getUpcomingMovies(),
        getTopRatedMovies(),
        popularMovies(),
      ]);

      setTrending(trendingRes.results);
      setUpcoming(upcomingRes.results);
      setTopRated(topRatedRes.results);
      setPopular(popularRes.results);
    } catch (error) {
      console.error("❌ Failed to load movies", error);
    } finally {
      setLoading(false);
    }


  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        trending,
        popular,
        topRated,
        upcoming,
        loading,
        refresh: loadMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = (): MoviesContextType => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMovies must be used within MoviesProvider");
  }
  return context;
};
