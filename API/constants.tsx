export const baseApi = "https://api.themoviedb.org/3";
const api_key = "c8b1d1d82f7fd484b9500aa323f9b8fa";

export const trendingApi = `${baseApi}/trending/movie/week?api_key=${api_key}`;
export const upcomingApi = `${baseApi}/movie/upcoming?api_key=${api_key}`;
export const topRatedApi = `${baseApi}/movie/top_rated?api_key=${api_key}`;
export const popularApi = `${baseApi}/movie/popular?api_key=${api_key}`;