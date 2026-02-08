import React, { useState, useMemo, useEffect } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  View,
  Text,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown, ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useMovies } from "../../../context/MoviesContext";
import colors from "../../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const sortOptions = [
  { key: "rating", label: "Rating" },
  { key: "popularity", label: "Popularity" },
  { key: "release_date", label: "Release Date" },
];

export default function UpcomingScreen() {
  const router = useRouter();
  const { upcoming, loading, refresh } = useMovies();

  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sortedMovies = useMemo(() => {
    return [...upcoming].sort((a, b) => {
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
  }, [upcoming, sortBy]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  /* ---------- Movie Card ---------- */
  const MovieCard = ({ movie }: { movie: any }) => {
    const scaleAnim = useState(new Animated.Value(0))[0];

    useEffect(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
      }).start();
    }, []);

    return (
      <TouchableOpacity onPress={() => router.push(`/movies/${movie.id}`)}>
        <Animated.View
          style={{
            width: (SCREEN_WIDTH - 48) / 2,
            height: 220,
            marginBottom: 12,
            borderRadius: 12,
            overflow: "hidden",
            backgroundColor: colors.surface,
            elevation: 4,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}`,
            }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />

          <Text
            numberOfLines={1}
            style={{
              marginTop: 6,
              textAlign: "center",
              fontSize: 14,
              fontWeight: "600",
              color: colors.textPrimary,
            }}
          >
            {movie.title}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              textAlign: "center",
              fontSize: 12,
              color: colors.textSecondary,
            }}
          >
            ⭐ {movie.vote_average.toFixed(1)}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

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
          All Movies
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

      {/* ---------- List ---------- */}
      <FlatList
        data={sortedMovies}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
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
                    width: (SCREEN_WIDTH - 48) / 2,
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
