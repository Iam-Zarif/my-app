import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Menu, Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import colors from "../theme";

interface NavbarProps {
  toggleDrawer: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ toggleDrawer }) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity onPress={toggleDrawer}>
        <Menu color={colors.textPrimary} />
      </TouchableOpacity>

      <Image
        source={require("../assets/logo.png")}
        className="resize-contain"
        style={{ width: 30, height: 30 }}
      />

      <TouchableOpacity onPress={() => router.push("/search")}>
        <Search color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
