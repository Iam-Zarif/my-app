import { View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect, memo } from "react";
import colors from "../theme";

type MovieCardProps = {
  movie: { id: number; title: string; poster: string };
  width: number;
  onPress?: () => void;
  onLoadEnd?: () => void;
};

const MovieCard: React.FC<MovieCardProps> = ({
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
      } catch (err) {
        if (isMounted) setLoaded(true); 
      }
    };
    loadImage();
    return () => {
      isMounted = false;
    };
  }, [movie.poster, onLoadEnd]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        style={{
          width,
          height: 450,
          borderRadius: 24,
          overflow: "hidden",
          backgroundColor: colors.surface,
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        {!loaded && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "#2a2a2a",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

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

export default memo(MovieCard);
