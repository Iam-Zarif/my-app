import React, { useState, useMemo, useEffect, memo } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  View,
  Text,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown, ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import colors from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const defaultSortOptions = [
  { key: "rating", label: "Rating" },
  { key: "popularity", label: "Popularity" },
  { key: "release_date", label: "Release Date" },
];

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  popularity: number;
  release_date: string;
};

type MoviesGridProps = {
  title: string;
  movies: Movie[];
  loading: boolean;
  refresh: () => Promise<void>;
  sortOptions?: typeof defaultSortOptions;
};

const MovieCard = memo(
  ({
    movie,
    width,
    onPress,
  }: {
    movie: Movie;
    width: number;
    onPress?: () => void;
  }) => {
    const [loaded, setLoaded] = useState(false);
    const scaleAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }).start();
    }, []);

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Animated.View
          style={{
            width,
            height: 220,
            marginBottom: 12,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: colors.surface,
            elevation: 4,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {!loaded && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#2a2a2a",
              }}
            >
              <ActivityIndicator color={colors.primary} size="small" />
            </View>
          )}
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
            onLoadEnd={() => setLoaded(true)}
          />

          {/* Bottom overlay with title & rating */}
          <View
            style={{
              position: "absolute",
              bottom: 8,
              left: 8,
              right: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: colors.textPrimary,
                  fontWeight: "600",
                  fontSize: 14,
                }}
              >
                {movie.title}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                }}
              >
                ⭐ {movie.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);


export default function MoviesGridSection({
  title,
  movies,
  loading,
  refresh,
  sortOptions = defaultSortOptions,
}: MoviesGridProps) {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState(sortOptions[0].key);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.vote_average - a.vote_average;
        case "popularity":
          return b.popularity - a.popularity;
        case "release_date":
          return (
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
          );
        default:
          return 0;
      }
    });
  }, [movies, sortBy]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const cardWidth = (SCREEN_WIDTH - 48) / 2;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ padding: 16, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 12 }}
        >
          <ChevronLeft size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.primary,
            flex: 1,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => setDropdownOpen(!dropdownOpen)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 8,
            backgroundColor: colors.surface,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: colors.primary, marginRight: 4 }}>
            Sorted by: {sortOptions.find((o) => o.key === sortBy)?.label}
          </Text>
          <ChevronDown size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {dropdownOpen && (
        <View
          style={{
            marginHorizontal: 16,
            marginBottom: 12,
            padding: 12,
            backgroundColor: colors.surface,
            borderRadius: 12,
          }}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => {
                setSortBy(option.key);
                setDropdownOpen(false);
              }}
              style={{ paddingVertical: 8 }}
            >
              <Text
                style={{
                  color:
                    sortBy === option.key
                      ? colors.primary
                      : colors.textSecondary,
                  fontWeight: sortBy === option.key ? "700" : "500",
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={sortedMovies}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            width={cardWidth}
            onPress={() => router.push(`/movies/${item.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          loading ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: cardWidth,
                    height: 220,
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    marginBottom: 12,
                  }}
                />
              ))}
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
