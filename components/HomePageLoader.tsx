import { View, ScrollView } from "react-native";
import colors from "../theme";

type Props = {
  cards?: number;
};

const MovieListSkeleton = ({ cards = 5 }: Props) => {
  return (
    <View className="mt-6">
      <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
        {[1, 2, 3].map((_, i) => (
          <View
            key={i}
            style={{
              height: 16,
              width: i === 2 ? "50%" : "70%",
              backgroundColor: colors.textSecondary,
              borderRadius: 6,
              opacity: 0.1,
              marginBottom: 8,
            }}
          />
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16 }}
      >
        {Array.from({ length: cards }).map((_, i) => (
          <View
            key={i}
            style={{
              width: 180,
              height: 280,
              borderRadius: 16,
              backgroundColor: colors.textSecondary,
              marginRight: 12,
              opacity: 0.1,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieListSkeleton;
