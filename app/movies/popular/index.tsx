import MoviesGridSection from "../../../components/reusable/MoviesGridScreen";
import { useMovies } from "../../../context/MoviesContext";


export default function PopularScreen() {
  const { popular, loading, refresh } = useMovies();

  return (
    <MoviesGridSection
      title="Popular Movies"
      movies={popular}
      loading={loading}
      refresh={refresh}
    />
  );
}
