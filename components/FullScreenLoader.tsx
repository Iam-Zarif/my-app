import { View, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { Film, Sparkles } from "lucide-react-native";
import colors from "../theme";

const Loader = () => {
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const glow = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1.05],
  });

  return (
    <View className="items-center">
      <Animated.View
        className="items-center justify-center rounded-full"
        style={{
          width: 88,
          height: 88,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          opacity: glow,
          transform: [{ scale }],
        }}
      />

      <Animated.View
        className="absolute items-center justify-center"
        style={{ width: 88, height: 88, transform: [{ rotate }] }}
      >
        <Film size={38} color={colors.primary} />
      </Animated.View>

      <View className="absolute" style={{ top: 6, right: 6 }}>
        <Sparkles size={16} color={colors.accent} />
      </View>
    </View>
  );
};

export default Loader;
