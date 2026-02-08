import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect, memo } from "react";
import colors from "../theme";

type Movie = {
  id: number;
  title: string;
  poster: string;
};

type MovieListCardProps = {
  movie: Movie;
  width: number;
  onPress?: () => void;
  onLoadEnd?: () => void;
};

const MovieListCard: React.FC<MovieListCardProps> = ({
  movie,
  width,
  onPress,
  onLoadEnd,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadImage = async () => {
      try {
        await Image.prefetch(movie.poster);
        if (isMounted) {
          setLoaded(true);
          onLoadEnd?.();
        }
      } catch {
        if (isMounted) setLoaded(true);
      }
    };
    loadImage();
    return () => {
      isMounted = false;
    };
  }, [movie.poster, onLoadEnd]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{ marginRight: 12 }}
    >
      <View
        style={{
          width,
          height: 220,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: colors.surface,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!loaded && <ActivityIndicator size="small" color={colors.primary} />}
        {loaded && (
          <Image
            source={{ uri: movie.poster }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(MovieListCard);
