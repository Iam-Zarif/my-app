import { View, Dimensions, Text } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import MovieCard from "./MovieCard";
import colors from "../theme";
import { useRouter } from "expo-router";
import { useMovies } from "../context/MoviesContext";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.8;

const TrendingMovies = () => {
  const router = useRouter();
  const { trending, loading } = useMovies();

  if (loading) {
    return (
      <View style={{ backgroundColor: colors.background, paddingVertical: 16 }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Trendings
        </Text>
        <View
          style={{
            width: cardWidth,
            height: 300,
            alignSelf: "center",
            backgroundColor: colors.surface,
            borderRadius: 12,
          }}
        />
      </View>
    );
  }
  return (
    <View className="mt-2" style={{ backgroundColor: colors.background }}>
      <Text
        className="text-xl font-bold text-center"
        style={{ color: colors.primary }}>
        Trendings
      </Text>

      <Carousel
        loop
        width={width}
        height={400}
        data={trending}
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={900}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 110,
        }}
        renderItem={({ item }) => (
          <View style={{ width, alignItems: "center" }}>
            <MovieCard
              movie={{
                id: item.id,
                title: item.title,
                poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              width={cardWidth}
              onPress={() => router.push(`/movies/${item.id}`)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default TrendingMovies;
