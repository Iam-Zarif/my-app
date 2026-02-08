
import { useMemo } from "react";
import { useMovies } from "../../context/MoviesContext";
import MoviesGridSection from "../../components/reusable/MoviesGridScreen";

export default function AllMoviesScreen() {
  const { trending, popular, topRated, upcoming, loading, refresh } =
    useMovies();

  const allMovies = useMemo(() => {
    return [...trending, ...popular, ...topRated, ...upcoming];
  }, [trending, popular, topRated, upcoming]);

  return (
    <MoviesGridSection
      title="All Movies"
      movies={allMovies}
      loading={loading}
      refresh={refresh}
    />
  );
}
