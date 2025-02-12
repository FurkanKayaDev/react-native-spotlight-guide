import { Dimensions } from "react-native";

export const SCREEN = {
  WIDTH: Dimensions.get("window").width,
  HEIGHT: Dimensions.get("window").height,
};

export const SPOTLIGHT_DEFAULTS = {
  SHAPE: "rectangle",
  PADDING: 10,
  OVERLAY_OPACITY: 0.7,
  OVERLAY_COLOR: "rgba(0, 0, 0, 0.7)",
  ANIMATION_DURATION: 300,
  CONTENT_POSITION: "bottom",
  MEASURE_ATTEMPTS: 5,
  MEASURE_DELAY: 100,
} as const;
