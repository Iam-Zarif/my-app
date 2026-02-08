import { useEffect } from "react";
import { Slot } from "expo-router";
import * as Notifications from "expo-notifications";
import { MoviesProvider } from "../context/MoviesContext";
import "../global.css";
import { registerForPushNotificationsAsync } from "../utils/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <MoviesProvider>
      <Slot />
    </MoviesProvider>
  );
}
