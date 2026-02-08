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
import { useMemo, useState, useEffect } from "react";
import colors from "../../theme";
import { useMovies } from "../../context/MoviesContext";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w780";

export default function SearchScreen() {
  const router = useRouter();
  const { trending, popular, topRated, upcoming } = useMovies();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastSearches, setLastSearches] = useState<string[]>([]);

  const allMovies = useMemo(
    () => [...trending, ...popular, ...topRated, ...upcoming],
    [trending, popular, topRated, upcoming],
  );

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    setLoading(true);
    const filtered = allMovies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase()),
    );
    setLoading(false);
    return filtered;
  }, [query, allMovies]);

  useEffect(() => {
    if (query.trim() && !lastSearches.includes(query)) {
      setLastSearches((prev) => [query, ...prev].slice(0, 10));
    }
  }, [query]);

const suggestions = useMemo(() => {
  if (query.trim()) return []; 
  return lastSearches
    .map((q) =>
      allMovies.find((m) => m.title.toLowerCase() === q.toLowerCase()),
    )
    .filter(Boolean); 
}, [query, lastSearches, allMovies]);


  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
        <SafeAreaView
          edges={["top"]}
          style={{ backgroundColor: colors.background }}
        >
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
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

            <View className="mt-2"
              style={{
                backgroundColor: colors.surface,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Search size={18} color={colors.textMuted} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search movies"
                placeholderTextColor={colors.textSecondary}
                style={{
                  color: "#fff",
                  flex: 1,
                  marginLeft: 8,
                  fontSize: 16,
                  height: 40,
                }}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery("")}>
                  <X size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {query.length > 0 && !loading && (
            <Text
            className="border-b border-neutral-500"
              style={{
                color: colors.textSecondary,
                marginTop: 8,
                paddingHorizontal: 16,
                paddingBottom:10
              }}
            >
              {filteredResults.length} results found
            </Text>
          )}
        </SafeAreaView>

        {loading && (
          <View style={{ marginTop: 16, alignItems: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

        {!loading && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              paddingHorizontal: 16,
              marginTop: 8,
            }}
          >
            {(query ? filteredResults : suggestions)?.map((item, index) => {
              if (!item) return null;
              return (
                <TouchableOpacity
                  key={`${item.id}-${index}`}
                  onPress={() => {
                    router.push(`/movies/${item.id}`);
                    if (!lastSearches.includes(item.title)) {
                      setLastSearches((prev) =>
                        [item.title, ...prev].slice(0, 10),
                      );
                    }
                  }}
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
              );
            })}

            {!query && suggestions.length === 0 && (
              <Text style={{ color: colors.textSecondary, marginTop: 12 }}>
                No recent searches
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
