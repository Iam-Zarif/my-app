import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Image,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  X,
  TrendingUp,
  Star,
  Calendar,
  Github,
  Linkedin,
  FireExtinguisher,
  ListIcon,
} from "lucide-react-native";
import colors from "../theme";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("screen");

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const sections = [
  { name: "Trending", icon: FireExtinguisher, route: "/movies/trending" },
  { name: "Popular", icon: TrendingUp, route: "/movies/popular" },
  { name: "Top Rated", icon: Star, route: "/movies/toprated" },
  { name: "Upcoming", icon: Calendar, route: "/movies/upcoming" },
  { name: "All Movies", icon: ListIcon, route: "/movies" },
];

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-height)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: open ? 0 : -height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [open]);

  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  if (!open) return null;

  return (
    <>
      <TouchableOpacity
        onPress={onClose}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 49,
        }}
      />

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: colors.surface,
          transform: [{ translateY: slideAnim }],
          zIndex: 50,
          paddingHorizontal: 24,
        }}
      >
        <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
            }}
          >
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 36, height: 36 }}
              resizeMode="contain"
            />
            <TouchableOpacity onPress={onClose}>
              <X size={28} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{
              flex: 1,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            }}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {sections.map(({ name, icon: Icon, route }) => (
              <TouchableOpacity
                key={name}
                onPress={() => {
                  router.push(route);
                  onClose();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 16,
                  paddingVertical: 14,
                }}
              >
                <Icon size={24} color={colors.secondary} />
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  {name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingVertical: 16,
              flexDirection: "row",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <TouchableOpacity
              onPress={() => openLink("https://github.com/Iam-Zarif")}
            >
              <Github size={26} color={colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                openLink("https://www.linkedin.com/in/mostofa-fatin-863793257")
              }
            >
              <Linkedin size={26} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default MenuDrawer;
