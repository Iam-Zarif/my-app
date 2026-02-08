import { View, ScrollView, RefreshControl } from "react-native";
import colors from "../theme";

type Props = {
  refreshing: boolean;
  onRefresh: () => void;
};

const MovieDetailPageLoader: React.FC<Props> = ({ refreshing, onRefresh }) => {
  return (
    <ScrollView
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
      {/* Hero skeleton */}
      <View
        style={{
          width: "100%",
          height: 620,
          backgroundColor: colors.textSecondary,
          opacity: 0.1,
        }}
      />

      {/* Content skeleton */}
      <View style={{ padding: 16 }}>
        {/* Title */}
        <View
          style={{
            height: 28,
            width: "70%",
            backgroundColor: colors.textSecondary,
            opacity: 0.1,
            marginBottom: 12,
            borderRadius: 6,
          }}
        />

        {/* Subtitle */}
        <View
          style={{
            height: 16,
            width: "40%",
            backgroundColor: colors.textSecondary,
            opacity: 0.1,
            marginBottom: 16,
            borderRadius: 6,
          }}
        />

        {/* Overview */}
        <View
          style={{
            height: 80,
            width: "100%",
            backgroundColor: colors.textSecondary,
            opacity: 0.1,
            borderRadius: 8,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetailPageLoader;
