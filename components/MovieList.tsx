import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import colors from "../theme";
import MovieListCard from "./MovieListCard";
import { useMovies } from "../context/MoviesContext";

type SectionType = "trending" | "popular" | "topRated" | "upcoming";

type MovieListProps = {
  title: string;
  section: SectionType;
  route: string;

};

const MovieList: React.FC<MovieListProps> = ({
  title,
  section,
  route,

}) => {
  const router = useRouter();
  const moviesContext = useMovies();

  const data = moviesContext[section] || [];

  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between px-4 mb-3">
        <Text className="text-xl font-bold" style={{ color: colors.primary }}>
          {title}
        </Text>

        <TouchableOpacity onPress={() => router.push(route)}>
          <Text
            className="text-sm font-semibold"
            style={{ color: colors.accent }}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
      >
        {data.map((movie: any) => (
          <MovieListCard
            key={movie.id}
            movie={{
              id: movie.id,
              title: movie.title,
              poster: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
            }}
            width={150}
            onPress={() => router.push(`/movies/${movie.id}`)}
     
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;
