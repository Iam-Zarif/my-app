import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { ArrowLeft, Play, Heart } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import colors from "../../theme";
import { useMovies } from "../../context/MoviesContext";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";
const THUMB_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { trending, upcoming, topRated, popular, loading, refresh } =
    useMovies();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const movies = useMemo(
    () => [...trending, ...upcoming, ...topRated, ...popular],
    [trending, upcoming, topRated, popular],
  );

  const movie = useMemo(() => {
    if (!id) return undefined;
    return movies.find((m) => m.id === Number(id));
  }, [id, movies]);



  const similarMovies = useMemo(() => {
    if (!movie) return [];
    return movies.filter((m) => m.id !== movie.id).slice(0, 6);
  }, [movies, movie]);

  if (loading || !movie) {
    return (
      <ScrollView
     
        style={{ flex: 1, backgroundColor: colors.background }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <View
          style={{
            width: "100%",
            height: 620,
            backgroundColor: colors.surface,
          }}
        />
        <View style={{ padding: 16 }}>
          <View
            style={{
              height: 28,
              width: "70%",
              backgroundColor: colors.surface,
              marginBottom: 12,
            }}
          />
          <View
            style={{
              height: 16,
              width: "40%",
              backgroundColor: colors.surface,
              marginBottom: 16,
            }}
          />
          <View
            style={{
              height: 80,
              width: "100%",
              backgroundColor: colors.surface,
            }}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 48 }}
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
        />
      }
    >
      <View style={{ position: "absolute", top: 45, left: 16, zIndex: 20 }}>
        <TouchableOpacity
          onPress={router.back}
          style={{
            backgroundColor: colors.overlay,
            padding: 8,
            borderRadius: 20,
          }}
        >
          <ArrowLeft size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", top: 45, right: 16, zIndex: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.overlay,
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Heart size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{
            uri: `${IMAGE_BASE}${movie.backdrop_path || movie.poster_path}`,
          }}
          style={{ width: "100%", height: 620 }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.6)", "rgba(0,0,0,1)"]}
          locations={[0, 0.6, 1]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 240,
          }}
        />
      </View>

      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 6,
          }}
        >
          {movie.title}
        </Text>
        {movie.original_title !== movie.title && (
          <Text style={{ color: colors.textSecondary, marginBottom: 8 }}>
            {movie.original_title}
          </Text>
        )}
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 16 }}
        >
          <Text style={{ color: colors.textSecondary, marginRight: 14 }}>
            ⭐ {movie.vote_average.toFixed(1)}
          </Text>
          <Text style={{ color: colors.textSecondary, marginRight: 14 }}>
            👥 {movie.vote_count}
          </Text>
          <Text style={{ color: colors.textSecondary }}>
            📈 {Math.round(movie.popularity)}
          </Text>
        </View>
        <Text
          style={{
            color: colors.textPrimary,
            marginBottom: 28,
            lineHeight: 22,
          }}
        >
          {movie.overview}
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderRadius: 14,
            paddingVertical: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Play size={20} color={colors.background} />
          <Text
            style={{
              color: colors.background,
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 8,
            }}
          >
            Watch Trailer
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: colors.primary,
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 12,
          }}
        >
          Similar Movies
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {similarMovies.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => router.push(`/movies/${item.id}`)}
              style={{ marginRight: 14 }}
            >
              <Image
                source={{ uri: `${THUMB_BASE}${item.poster_path}` }}
                style={{
                  width: 120,
                  height: 180,
                  borderRadius: 12,
                  backgroundColor: colors.surface,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  color: colors.textSecondary,
                  width: 120,
                  marginTop: 6,
                  fontSize: 14,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
