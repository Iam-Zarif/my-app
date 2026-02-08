import { tmdbFetch } from "../lib/tmdb";
import { Movie, PaginatedResponse } from "../types/movie";

export const getTrendingMovies = (): Promise<PaginatedResponse<Movie>> =>
  tmdbFetch<PaginatedResponse<Movie>>("/trending/movie/week?language=en-US");

export const getUpcomingMovies = (): Promise<PaginatedResponse<Movie>> =>
  tmdbFetch<PaginatedResponse<Movie>>("/movie/upcoming");

export const getTopRatedMovies = (): Promise<PaginatedResponse<Movie>> =>
  tmdbFetch<PaginatedResponse<Movie>>("/movie/top_rated");

export const popularMovies = (): Promise<PaginatedResponse<Movie>> =>
  tmdbFetch<PaginatedResponse<Movie>>("/movie/popular");
