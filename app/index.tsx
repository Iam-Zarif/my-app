import { useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  RefreshControl,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import Navbar from "../shared/Navbar";
import MovieList from "../components/MovieList";
import Footer from "../shared/Footer";
import MenuDrawer from "../components/MenuDrawer";
import { useMovies } from "../context/MoviesContext";
import HomePageLoader from "../components/HomePageLoader";

const LandingPage = () => {
  const { trending, popular, topRated, upcoming, loading, refresh } =
    useMovies();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const showSkeleton =
    loading ||
    !trending.length ||
    !popular.length ||
    !topRated.length ||
    !upcoming.length;

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refresh(); 
    } catch (err) {
      console.warn("Failed to refresh:", err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        edges={["top"]}
        style={{ paddingVertical: 8, paddingHorizontal: 16 }}
      >
        <Navbar toggleDrawer={() => setDrawerOpen(true)} />
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]} // Android pull color
          />
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {showSkeleton ? (
        <HomePageLoader />
        ) : (
          <>
            <TrendingMovies />
            <MovieList
              title="Popular Movies"
              section="popular"
              route="/popular"
            />
            <MovieList
              title="Top Rated"
              section="topRated"
              route="/top-rated"
            />
            <MovieList
              title="Upcoming Movies"
              section="upcoming"
              route="/upcoming"
            />
          </>
        )}
        <Footer />
      </ScrollView>

      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {!loading &&
        !trending.length &&
        !popular.length &&
        !topRated.length &&
        !upcoming.length && (
          <View
            style={{
              position: "absolute",
              top: 100,
              left: 16,
              right: 16,
              padding: 12,
              backgroundColor: colors.overlay,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              No internet connection or failed to load movies.
            </Text>
          </View>
        )}
    </View>
  );
};

export default LandingPage;
