import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Search, X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import colors from "../../theme";
import { useMovies } from "../../context/MoviesContext";

const SearchScreen = () => {
  const router = useRouter();
  const { trending, popular, topRated, upcoming } = useMovies();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";
  const allMovies = useMemo(
    () => [...trending, ...popular, ...topRated, ...upcoming],
    [trending, popular, topRated, upcoming],
  );


  const results = useMemo(() => {
    if (!query.trim()) return [];
    setLoading(true);
    const filtered = allMovies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase()),
    );
    setLoading(false);
    return filtered;
  }, [query, allMovies]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Image
        source={require("../../assets/logo.png")}
        resizeMode="contain"
        style={{
          width: 240,
          height: 240,
          position: "absolute",
          alignSelf: "center",
          top: "50%",
          transform: [{ translateY: -120 }],
          opacity: 0.06,
        }}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <SafeAreaView
          edges={["top"]}
          style={{ backgroundColor: colors.background }}
        >
          <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <TouchableOpacity
                onPress={router.back}
                style={{
                  backgroundColor: colors.overlay,
                  padding: 8,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              >
                <ArrowLeft size={22} color={colors.primary} />
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Search
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 12,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Search size={18} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search movies"
                placeholderTextColor={colors.textMuted}
                style={{
                  color: colors.textPrimary,
                  flex: 1,
                  marginLeft: 8,
                  fontSize: 15,
                  height: 20,
                }}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery("")}>
                  <X size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>

            {query.length > 0 && !loading && (
              <Text style={{ color: colors.textSecondary, marginTop: 8 }}>
                {results.length} results
              </Text>
            )}
          </View>
        </SafeAreaView>

        {loading ? (
          <View style={{ marginTop: 32, alignItems: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginTop: 8,
            }}
          >
            {results.map((item, index) => (
              <TouchableOpacity
                key={`${item.id}-${index}`} 
                onPress={() => router.push(`/movies/${item.id}`)}
                style={{ width: "48%", marginBottom: 16 }}
              >
                <Image
                  source={{
                    uri: `${IMAGE_BASE}${item.backdrop_path || item.poster_path}`,
                  }}
                  style={{
                    width: "100%",
                    height: 220,
                    borderRadius: 14,
                    backgroundColor: colors.surface,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{ color: colors.textPrimary, marginTop: 6 }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
