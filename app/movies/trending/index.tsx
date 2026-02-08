import MoviesGridSection from "../../../components/reusable/MoviesGridScreen";
import { useMovies } from "../../../context/MoviesContext";

export default function TrendingScreen() {
  const { trending, loading, refresh } = useMovies();

  return (
    <MoviesGridSection
      title="Trending Movies"
      movies={trending}
      loading={loading}
      refresh={refresh}
    />
  );
}
