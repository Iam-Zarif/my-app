import { View, Text, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Github, Linkedin } from "lucide-react-native";
import colors from "../theme";

const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err),
    );
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        backgroundColor: colors.cardBackground,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 48,
        alignItems: "center",
      }}
    >
      <Text
        style={{ color: colors.textSecondary, fontSize: 12, marginBottom: 8 }}
      >
        © 2026 Movies App. All rights reserved.
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          columnGap: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => openLink("https://github.com/Iam-Zarif")}
        >
          <Github size={18} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            openLink("https://www.linkedin.com/in/mostofa-fatin-863793257")
          }
        >
          <Linkedin size={18} color={colors.accent} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Footer;
