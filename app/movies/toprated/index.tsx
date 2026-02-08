import MoviesGridSection from "../../../components/reusable/MoviesGridScreen";
import { useMovies } from "../../../context/MoviesContext";

export default function TopRatedScreen() {
  const { topRated, loading, refresh } = useMovies();

  return (
    <MoviesGridSection
      title="Top Rated Movies"
      movies={topRated}
      loading={loading}
      refresh={refresh}
    />
  );
}
