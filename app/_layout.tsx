import { Slot } from "expo-router";
import "../global.css";
import { MoviesProvider } from "../context/MoviesContext";

export default function RootLayout() {
  return (
    <MoviesProvider>
      <Slot />
    </MoviesProvider>
  );
}
