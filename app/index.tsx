import { useMemo, useState } from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import Navbar from "../shared/Navbar";
import MovieList from "../components/MovieList";
import Footer from "../shared/Footer";
import MenuDrawer from "../components/MenuDrawer";
import Loader from "../components/FullScreenLoader";
import { useMovies } from "../context/MoviesContext";

const LandingPage = () => {
  const { trending, popular, topRated, upcoming } = useMovies();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalPosters = useMemo(
    () => trending.length + popular.length + topRated.length + upcoming.length,
    [trending, popular, topRated, upcoming],
  );

  const [loaded, setLoaded] = useState(0);

  const onPosterLoaded = () => {
    setLoaded((v) => Math.min(v + 1, totalPosters));
  };

  const showLoader = loaded < totalPosters;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        edges={["top"]}
        style={{ paddingVertical: 8, paddingHorizontal: 16 }}
      >
        <Navbar toggleDrawer={() => setDrawerOpen(true)} />
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TrendingMovies onPosterLoaded={onPosterLoaded} />
        <MovieList
          title="Popular Movies"
          section="popular"
          route="/popular"
          onPosterLoaded={onPosterLoaded}
        />
        <MovieList
          title="Top Rated"
          section="topRated"
          route="/top-rated"
          onPosterLoaded={onPosterLoaded}
        />
        <MovieList
          title="Upcoming Movies"
          section="upcoming"
          route="/upcoming"
          onPosterLoaded={onPosterLoaded}
        />
        <Footer />
        {showLoader && (
          <View style={{ marginVertical: 24, alignItems: "center" }}>
            <Loader />
          </View>
        )}
      </ScrollView>
      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </View>
  );
};

export default LandingPage;
